export const sort = (dataSet: any, sortColumn: string) => {
  const result = dataSet.sort(function (a, b) {
    const first =
      typeof a[sortColumn] === "string"
        ? a[sortColumn].toUpperCase()
        : a[sortColumn];
    const second =
      typeof b[sortColumn] === "string"
        ? b[sortColumn].toUpperCase()
        : b[sortColumn];

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

export const cleanMe = (aString: string) => {
  return aString.toLowerCase().replace(/ /g, "").replace(/\//g, "");
};

export const buildCategoryLink = (
  category: string,
  month: number,
  year: number
) => {
  const url = "/transactions/" + cleanMe(category) + "/" + month + "/" + year;
  const urlYTD = url + "/ytd";
  return (
    '<a data-category="' +
    category +
    '" href="' +
    url +
    '" class="category-link">' +
    category +
    '</a> <a data-category="' +
    category +
    '" href="' +
    urlYTD +
    '" class="category-link">(YTD)</a>'
  );
};
