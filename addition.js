const { combineObjIntoMap } = require('./utils');

// Fundamental idea: Addition is combining like parts with like
class Addition {
  constructor(operandOne, operandTwo) {
    this.operandOne = operandOne;
    this.operandTwo = operandTwo;
  }

  sum() {
    // Merge like pieces into a single array
    const combinedPieces = Addition.getLikePieces(this.operandOne, this.operandTwo);
    const type = this.operandOne.constructor;
    const sum = {};

    // combinedPieces is a Map, iterate and reduce each array
    combinedPieces.forEach((value, key) => {
      const pieceSum = value.reduce((agg, curr) => agg + curr);
      sum[key] = pieceSum;
    });

    // type has getFromOperation to convert back to type's strucuture
    return type.getFromOperation(sum);
  }

  static getLikePieces(operandOne, operandTwo) {
    const piecesOne = operandOne.getPieces();
    const piecesTwo = operandTwo.getPieces();

    // FEATURE: try to coerce one type into another instead of throwing an error
    // e.g., Integer { value: 6 } into Polynomial { '': 6 }
    const operandsSameType = operandOne.constructor === operandTwo.constructor;
    if(!operandsSameType) throw new Error('Operands are not the same type!')

    return combineObjIntoMap(piecesOne, piecesTwo);
  }
}

class Integer {
  constructor(value) {
    this.value = value
  }

  // getPieces converts value into an object that Addition (any Operation?) can understand
  getPieces() {
    return { value: this.value };
  }

  // getExpression knows how to convert value into something roughly resembling
  // the usual representation of the object
  getExpression() {
    return this.value;
  }

  // getFromOperation converts from Addition's format back to Integer
  // Expects an object with "value" property
  static getFromOperation(aggregate) {
    return new Integer(aggregate.value)
  }
}

const seven = new Integer(12323);
const negativeTwo = new Integer(-2332);
const integerSum = new Addition(seven, negativeTwo).sum();

console.log(integerSum.getExpression());





class Polynomial {
  constructor(coefficients) {
    this.coefficients = coefficients
  }

  getPieces() {
    return this.coefficients;
  }

  getExpression() {
    const variables = Object.keys(this.coefficients);

    return variables.reduce((agg, variable, index) => {
      const coefficient = this.coefficients[variable];
      const term = index === 0 ? `${coefficient}${variable}` : ` + ${coefficient}${variable}`;
      agg += term;
      return agg;
    }, '');
  }

  static getFromOperation(aggregate) {
    return new Polynomial(aggregate)
  }
}

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





class Matrix {
  constructor(entries) {
    this.entries = entries
  }

  getPieces() {
    return this.entries;
  }

  getExpression() {
    return Object.keys(this.entries).reduce((agg, key) => {
      const row = key[0];
      if(!agg[row]) agg[row] = [];

      const col = key[1];
      agg[row][col] = this.entries[key];
      return agg;
    }, [])
  }

  static getFromOperation(aggregate) {
    return new Matrix(aggregate)
  }
}

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