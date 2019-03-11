export function buildCategoryLink(category, fullCategory, month, year) {
  var url = '/transactions/' + cleanMe(category) + '/' + month + '/' + year;
  var urlYTD = url + '/ytd';
  return '<a data-category="' + category + '" href="' + url + '" class="category-link">' + fullCategory + '</a> <a data-category="' + category + '" href="' + urlYTD + '" class="category-link">(YTD)</a>';
}

export function cleanMe(aString) {
  return aString.toLowerCase().replace(/ /g,'').replace(/\//g,'');
}

// Given an object of objects, convert it to an array of objects.
export function convertObjToArray(obj) {
  // Convert the object to an array.
  var objArray = [],
      objArrayItem = {};

  for (var key in obj) {
    // Skip the loop if the property is from prototype.
    if (!obj.hasOwnProperty(key)) continue;

    objArrayItem = obj[key];
    objArrayItem.nodeId = key;

    objArray.push(obj[key]);
  }

  return objArray;
}

export function roundTwoDigits(aNumber) {
  return new Number(aNumber).toFixed(2);
}

export function formatData(aNumber) {
  if (aNumber < 0) {
    return '<span class="negative">' + roundTwoDigits(aNumber) + '</span>'
  } else {
    return '<span class="positive">' + roundTwoDigits(aNumber) + '</span>'
  }
}

export function getFilters($form) {
  // NEED TO DEFINE JQUERY HERE...
  // var filters = [];

  // $form.find('select').each(function() {
  //   var id = $(this).attr('id');
  //   var val = $(this).val();
  //   var column = $(this).data('filter-column')

  //   filters.push( {id: id, val: val, column: column} );
  // })

  // return filters;
}

export function showError(error) {
  // NEED TO DEFINE JQUERY HERE...
  // var errorString = '<div class="alert">' + error + '</div>';
  // $('body').prepend(errorString);
}