import * as Helpers from './Helpers';

class CategoryLookup {
  constructor() {
    this.categories = [];
  }

  // categories: [],

  // Given a firebase snapshot, assign to the categories property.
  assignRows(snapshot) {
    // Convert the object to an array.
    snapshot = Helpers.convertObjToArray(snapshot);

    // Assign the array to the lookup object.
    this.categories = snapshot;
  }

  getParent(category) {
    var parent = this.categories.find(function(element) {
      return element.Category === category && element['Parent Category'] !== category;
    });
    
    var result = parent ? parent['Parent Category'] : null;

    return result;
  }

  getChildren(category) {
    var result = [];
    var children = this.categories.filter(function(element) {
      return element['Parent Category'] === category && element.Category !== category;
    })

    for (var i = 0; i < children.length ; i++) {
      result.push(children[i].Category);
    }

    return result;
  }

  getType(category) {
    var result = this.categories.find(function(element) {
      return element.Category === category;
    });

    if (result) {
      if (
        result.Category === 'Income' ||
        result['Parent Category'] === 'Income'
      ) {
        return 'Income';
      } else {
        return 'Expense';
      }
    } else {
      return null;
    }
  }

  isEnvelope (category) {
    var result = this.categories.find(function(element) {
      return element.Category === category;
    });

    if (result) {
      return result.Envelope;
    } else {
      return null;
    }
  }
};

export default CategoryLookup;
