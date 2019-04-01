import CategoryLookup from '../lib/Categories';
import * as Helpers from '../lib/Helpers';

// A library that defines our transacations data model.
class TransactionsModel {
  constructor() {
    this.rows = [];

    this.categoryLookup = new CategoryLookup();
  }

  // // Given a firebase snapshot, assign to the rows property.
  // assignRows(snapshot) {
  //   // Convert the object to an array.
  //   snapshot = convertObjToArray(snapshot);

  //   // Assign the array to the lookup object.
  //   this.rows = snapshot;
  // }

  // Remove commas and convert amounts to floats.
  cleanData() {
    for (var i = 0; i < this.rows.length; i++) {
      // We are assuming that .Amount comes in as a float.
      // this.rows[i].Amount = this.rows[i].Amount.replace(/,/g, ''); // Remove commas.
      this.rows[i].Amount = parseFloat(this.rows[i].Amount);
    }
  }

  // Get all the categories associated with all transactions in a given year.
  getUniqueCategories(month, year) {
    // Reduce the transactions and sum the total for each category.

    var result = this.rows.reduce(function(allCategories, transaction) {
      var parsedDate = Helpers.parseDate(transaction['Date']),
          thisMonth  = parsedDate.month,
          thisYear   = parsedDate.year;

      if (allCategories.indexOf(transaction.Category) > -1) {
        return allCategories;
      } else {
        if (thisYear === year && thisMonth === month) {
          allCategories.push(transaction.Category);
        }

        return allCategories;
      }
    }, []);

    return result;
  }

  getTransactionsInMonthYear(category, month, year) {
    var dataSet = this.rows.filter(function(transaction) {
      var thisMonth      = transaction.Month,
          thisYear       = transaction.Year,
          categoryFamily = [category];

      if (
        thisYear              != year  ||
        thisMonth             != month ||
        transaction.Labels    ==  'Business Expenses' // TODO make this more flexible
      ) {
        return false;
      }

      // Is the category a parent (top-level)?
      // If so, get all of its children, and when testing the categories below,
      // check to see if the transaction.Category equals the parent or any of its children.
      // If not, just proceed as normal.
      var parent = this.categoryLookup.getParent(category);
      if (parent) {
        // Do nothing
      } else {
        // The category is itself a parent.
        var children = this.categoryLookup.getChildren(category);
        categoryFamily = categoryFamily.concat(children); 
      }

      if (categoryFamily.indexOf(transaction.Category) > -1) {
        return true;
      }
    });

    return dataSet;
  }

  getTransactionsYTD(category, month, year) {
    var dataSet = [];

    for (var i = 1; i <= month; i++) {
      dataSet = dataSet.concat(this.getTransactionsInMonthYear(category, i, year));
    }

    return dataSet;
  }

  // Get the sum of all Amount in a series of transactions.
  // Technically, doesn't need to be a method on this object.
  getSum(dataSet) {
    var sum = 0;

    dataSet.forEach(function(key, val) {

      var catType = this.categoryLookup.getType(val['Category']);

      if (val['Transaction Type'] == 'debit') {
        if (catType == 'Expense') {
          sum += val.Amount;
        } else if (catType == 'Income') {
          sum -= val.Amount;
        }
      } else {
        if (catType == 'Expense') {
          sum -= val.Amount;
        } else if (catType == 'Income') {
          sum += val.Amount;
        }
      }
      
    })

    return sum;
  }

  // Technically, doesn't need to be a method on this object.
  sort(dataSet, sortColumn) {
    var result = dataSet.sort(function(a, b) {
      var first = a[sortColumn].toUpperCase(),
          second = b[sortColumn].toUpperCase();
      
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
  }
}

export default TransactionsModel;