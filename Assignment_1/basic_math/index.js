const sum = require("./sum")
const sub = require('./sub')
const mul = require('./multiplication')
const div = require('./divide')

let sumA = 100;
let sumB = 10;
let sumResult = sum(sumA,sumB)
let subResult = sub(sumA,sumB)
let mulResult = mul(sumA,sumB)
let divResult = div(sumA,sumB)
console.log(sumResult,subResult, divResult , mulResult)

