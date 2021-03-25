const combineObjIntoMap = (one, two) => {
  // Make array of all keys of one and two without duplicates
  const combinedKeys = Object.keys(one).reduce((agg, curr) => {
    if(!agg.includes(curr)) agg.push(curr);
    return agg;
  }, Object.keys(two))

  // Merge the values of one and two into a single array
  // Use Map so we can iterate later
  const aggregatedValues = combinedKeys.reduce((agg, curr) => {
    agg.set(curr, []);

    if(one[curr]) {
      const currentValue = agg.get(curr);

      // If iterable, spread elements 
      // Else, simply add it to the array
      if(isIterable(one[curr])) agg.set(curr, [...currentValue, ...one[curr]]);
      else agg.set(curr, [...currentValue, one[curr]]);
    }
    if(two[curr]) {
      const currentValue = agg.get(curr);
      if(isIterable(two[curr])) agg.set(curr, [...currentValue, ...two[curr]]);
      else agg.set(curr, [...currentValue, two[curr]]);
    }

    return agg;
  }, new Map());

  return aggregatedValues;
};

const isIterable = (obj) => {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

module.exports = {
  combineObjIntoMap
}
