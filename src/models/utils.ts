// Technically, doesn't need to be a method on this object.
export const sort = (dataSet, sortColumn) => {
  const result = dataSet.sort(function (a, b) {
    const first = a[sortColumn].toUpperCase();
    const second = b[sortColumn].toUpperCase();

    if (first < second) {
      return -1;
    }

    if (first > second) {
      return 1;
    }

    // a must be equal to b
    return 0;
  });

  return result;
};
