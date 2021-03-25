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

module.exports = Matrix;
