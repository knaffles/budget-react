export const sort = (dataSet: any, sortColumn: string) => {
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

export const roundTwoDigits = (aNumber: number) => {
  return new Number(aNumber).toFixed(2);
};

// Parse dates.
export const parseDate = (dateString: string) => {
  const month = dateString.split("/")[0],
    year = dateString.split("/")[2];

  const result = {
    month: parseInt(month),
    year: parseInt(year),
  };

  return result;
};
