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

module.exports = Addition;
