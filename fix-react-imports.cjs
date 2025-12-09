const fs = require('fs');
const path = require('path');

function addReactImport(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes("from 'react'") && !content.includes('from "react"')) {
    const newContent = "import React from 'react';\n" + content;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx')) {
      addReactImport(filePath);
    }
  });
}

processDirectory('./src');
console.log('Done!');
