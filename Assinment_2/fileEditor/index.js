// Import the File System module
const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2); // Removes first 2 default values

// Destructure operation and other arguments
const [operation, ...rest] = args;

// Utility function to show error messages
function showUsageError() {
  console.log(`Invalid command or insufficient arguments.
Usage:
  node index.js read <filename>
  node index.js delete <filename>
  node index.js create <filename>
  node index.js append "<content>" <filename>
  node index.js rename <oldname> <newname>
  node index.js list <directory>
`);
}

// Handle different operations
switch (operation) {
  case 'read': {
    const [filename] = rest;
    if (!filename) return showUsageError();
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file '${filename}':`, err.message);
      } else {
        console.log(`Contents of '${filename}':\n${data}`);
      }
    });
    break;
  }

  case 'delete': {
    const [filename] = rest;
    if (!filename) return showUsageError();
    fs.unlink(filename, (err) => {
      if (err) {
        console.log(`Error deleting file '${filename}':`, err.message);
      } else {
        console.log(`File '${filename}' deleted`);
      }
    });
    break;
  }

  case 'create': {
    const [filename] = rest;
    if (!filename) return showUsageError();
    fs.writeFile(filename, '', (err) => {
      if (err) {
        console.log(`Error creating file '${filename}':`, err.message);
      } else {
        console.log(`File '${filename}' created`);
      }
    });
    break;
  }

  case 'append': {
    const [content, filename] = rest;
    if (!content || !filename) return showUsageError();
    fs.appendFile(filename, content + '\n', (err) => {
      if (err) {
        console.log(`Error appending to file '${filename}':`, err.message);
      } else {
        console.log(`Content appended to the file '${filename}'`);
      }
    });
    break;
  }

  case 'rename': {
    const [oldName, newName] = rest;
    if (!oldName || !newName) return showUsageError();
    fs.rename(oldName, newName, (err) => {
      if (err) {
        console.log(`Error renaming file:`, err.message);
      } else {
        console.log(`File '${oldName}' renamed to '${newName}'`);
      }
    });
    break;
  }

  case 'list': {
    const [dirPath] = rest;
    if (!dirPath) return showUsageError();
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.log(`Error listing directory '${dirPath}':`, err.message);
      } else {
        console.log(`Contents of directory '${dirPath}':`);
        files.forEach(file => console.log(file));
      }
    });
    break;
  }

  default:
    showUsageError();
}
