#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('node:readline');

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

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function subsituteContent(content, subsitutions) {
  let updatedContent = content;
  for (const { key, value } of subsitutions) {
    updatedContent = updatedContent.replaceAll(key, value);
  }
  return updatedContent;
}

function generateFile(currentPath, subsitutions, templateDir, generatedDir) {
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
      generateFile(localFilePath, subsitutions, templateDir, generatedDir);
    } else {
      console.log(`Could not determine file type for ${templateFilePath}. Skipping...`);
    }
  }
}

(async () => {
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
    generateFile("/", subsitutions, templateDir, generatedDir);
    console.log(`Done!`);
  } else {
    console.log(`Aborting! ${generatedDir} already exists!`);
  }
})();
