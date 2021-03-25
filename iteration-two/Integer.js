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

module.exports = Integer;
