const fs = require('fs');
const crypto = require('crypto');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Get command-line arguments
const [,, command, ...args] = process.argv;

// ==========================
// 1. Crypto Operations
// ==========================
function encryptString(input) {
  const algorithm = 'aes-256-cbc';
  const secretKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(input, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  console.log("Encrypted:", encrypted);
  console.log("Secret Key:", secretKey.toString('hex'));
  console.log("IV:", iv.toString('hex'));
}

function generateUUID() {
  const uuid = uuidv4();
  console.log("Generated UUID:", uuid);
}

// ==========================
// 2. Stream vs FS Comparison
// ==========================
function readUsingFS(filePath) {
  console.time("FS Read");
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return console.error("FS Error:", err.message);
    console.timeEnd("FS Read");
  });
}

function readUsingStream(filePath) {
  console.time("Stream Read");
  const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

  stream.on('data', chunk => {});
  stream.on('end', () => {
    console.timeEnd("Stream Read");
  });
  stream.on('error', err => {
    console.error("Stream Error:", err.message);
  });
}

// ==========================
// 3. OS Details
// ==========================
function printSystemInfo() {
  console.log("System Info:");
  console.log("Platform:", os.platform());
  console.log("Architecture:", os.arch());
  console.log("CPU Info:", os.cpus());
  console.log("Total Memory:", os.totalmem() / (1024 * 1024), 'MB');
  console.log("Free Memory:", os.freemem() / (1024 * 1024), 'MB');
  console.log("Uptime (s):", os.uptime());
  console.log("User Info:", os.userInfo());
  console.log("Network Interfaces:", os.networkInterfaces());
}

// ==========================
// Command Handling
// ==========================
switch (command) {
  case 'encrypt': {
    const input = args.join(' ') || "Hello, Good Morning";
    encryptString(input);
    break;
  }

  case 'uuid':
    generateUUID();
    break;

  case 'fsread': {
    const filePath = args[0];
    if (!filePath) return console.log("Please provide a file path");
    readUsingFS(filePath);
    break;
  }

  case 'streamread': {
    const filePath = args[0];
    if (!filePath) return console.log("Please provide a file path");
    readUsingStream(filePath);
    break;
  }

  case 'system':
    printSystemInfo();
    break;

  default:
    console.log(`Invalid or missing command.
Usage:
  node index.js encrypt "Your message"
  node index.js uuid
  node index.js fsread <file-path>
  node index.js streamread <file-path>
  node index.js system
`);
}
