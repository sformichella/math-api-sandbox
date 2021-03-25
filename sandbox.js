const Addition = require('./Addition');
const Integer = require('./Integer');
const Polynomial = require('./Polynomial');
const Matrix = require('./Matrix');

// Integer
const seven = new Integer(12323);
const negativeTwo = new Integer(-2332);
const integerSum = new Addition(seven, negativeTwo).sum();

console.log(integerSum.getExpression());

// Polynomial
const coeffOne = {
  '': -5,
  'x': 2,
  'xy': 6,
  'x^2y': 2
}

const coeffTwo = {
  '': 5,
  'xy': 2,
  'x^2y': -6,
  'x^2y^2': 2
}

const polyOne = new Polynomial(coeffOne);
const polyTwo = new Polynomial(coeffTwo);
const polySum = new Addition(polyOne, polyTwo).sum();

console.log(polySum.getExpression());

// Matrix
const matrixOneEntries = {
  '00': 1,
  '10': 4,
  '01': -2,
  '11': 3
}

const matrixTwoEntries = {
  '00': 4,
  '10': 1,
  '01': -1,
  '11': 2
}

const matrixOne = new Matrix(matrixOneEntries);
const matrixTwo = new Matrix(matrixTwoEntries);
const matrixSum = new Addition(matrixOne, matrixTwo).sum();

console.log(matrixOne.getExpression());
console.log(matrixTwo.getExpression());
console.log(matrixSum.getExpression());
