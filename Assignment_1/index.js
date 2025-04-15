const crypto = require('crypto');
const [,, operation, ...args] = process.argv;

const numbers = args.map(Number);

switch (operation) {
  case 'add':
    if (args.length < 2) return console.log('Provide two numbers for addition.');
    console.log(numbers[0] + numbers[1]);
    break;

  case 'sub':
    if (args.length < 2) return console.log('Provide two numbers for subtraction.');
    console.log(numbers[0] - numbers[1]);
    break;

  case 'mult':
    if (args.length < 2) return console.log('Provide two numbers for multiplication.');
    console.log(numbers[0] * numbers[1]);
    break;

  case 'divide':
    if (args.length < 2) return console.log('Provide two numbers for division.');
    if (numbers[1] === 0) return console.log('Cannot divide by zero.');
    console.log(numbers[0] / numbers[1]);
    break;

  case 'sin':
    if (args.length < 1) return console.log('Provide a number for sine calculation.');
    console.log(Math.sin(numbers[0]));
    break;

  case 'cos':
    if (args.length < 1) return console.log('Provide a number for cosine calculation.');
    console.log(Math.cos(numbers[0]));
    break;

  case 'tan':
    if (args.length < 1) return console.log('Provide a number for tangent calculation.');
    console.log(Math.tan(numbers[0]));
    break;

  case 'random':
    if (args.length < 1) return console.log('Provide length for random number generation.');
    const length = parseInt(args[0]);
    const random = crypto.randomBytes(length).toString('binary');
    console.log(random);
    break;

  default:
    console.log('Invalid operation. Supported operations: add, sub, mult, divide, sin, cos, tan, random');
}