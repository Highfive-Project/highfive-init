const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

/**
 * Polls for user input asynchronously
 * 
 * @param {string} question User prompt
 * @returns {Promise<string>} User answer
 */
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, answer => {
      resolve(answer);
      rl.close();
    });
  })
}

/**
 * Capitalizes first letter in a string
 * 
 * @param {string} val Input value
 * @returns {string} Capitalized value
 */
function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

/**
 * Subsitutes variables in content using
 * key-value pairs from subsitutions
 * 
 * @param {string} content Content to subsitute variables in
 * @param {{key: string, value: string}[]} subsitutions Key-value pairs of variables
 * @returns {string} Content with variables subsituted
 */
function subsituteContent(content, subsitutions) {
  let updatedContent = content;
  for (const { key, value } of subsitutions) {
    updatedContent = updatedContent.replaceAll(key, value);
  }
  return updatedContent;
}

/**
 * Recursively generates project directory from template directory
 * 
 * @param {string} currentPath Relative path for current location in the template directory
 * @param {{key: string, value: string}[]} subsitutions Key-value pairs of variables
 * @param {string} templateDir Path of template directory
 * @param {string} generatedDir Path of generated project directory
 */
function generateProject(currentPath, subsitutions, templateDir, generatedDir) {
  const files = fs.readdirSync(path.join(templateDir, currentPath));

  for (const file of files) {
    const localFilePath = path.join(currentPath, file);
    const templateFilePath = path.join(templateDir, localFilePath);
    const lstat = fs.lstatSync(templateFilePath);
    if (lstat.isFile()) {
      const generatedFilePath = subsituteContent(path.join(generatedDir, localFilePath), subsitutions);

      const fileContent = fs.readFileSync(templateFilePath, 'utf8');
      const generatedFileContent = subsituteContent(fileContent, subsitutions);

      const generatedFilePathDirname = path.dirname(generatedFilePath);
      if (!fs.existsSync(generatedFilePathDirname)) {
        fs.mkdirSync(generatedFilePathDirname, { recursive: true });
      }
      fs.writeFileSync(generatedFilePath, generatedFileContent);

      console.log(`Wrote to ${generatedFilePath}.`);

    } else if (lstat.isDirectory()) {
      generateProject(localFilePath, subsitutions, templateDir, generatedDir);
    } else {
      console.log(`Could not determine file type for ${templateFilePath}. Skipping...`);
    }
  }
}

async function main() {
  const langSlug = await askQuestion("Enter your language's slug (ex. vtl): ");
  const langName = await askQuestion("Enter your language's name (ex. Apache Velocity): ");
  const highlighterName = `hljs${capitalizeFirstLetter(langSlug)}`;

  const subsitutions = [
    {
      key: "HIGHFIVE_LANG_SLUG",
      value: langSlug,
    },
    {
      key: "HIGHFIVE_LANG_NAME",
      value: langName,
    },
    {
      key: "HIGHFIVE_HIGHLIGHTER_NAME",
      value: highlighterName,
    },
  ];

  const templateDir = path.join(__dirname, "template");
  const generatedDir = `highlightjs-${langSlug}`;

  if (!fs.existsSync(generatedDir)) {
    generateProject("/", subsitutions, templateDir, generatedDir);

    // gitignore and npmignore need to be named differently since they don't get
    // packed by npm publish
    fs.renameSync(path.join(generatedDir, "template.gitignore"), path.join(generatedDir, ".gitignore"));
    fs.renameSync(path.join(generatedDir, "template.npmignore"), path.join(generatedDir, ".npmignore"));

    console.log(`Done!`);
  } else {
    console.log(`Aborting! ${generatedDir} already exists!`);
  }
}

module.exports = main;