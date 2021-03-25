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

module.exports = Polynomial;
