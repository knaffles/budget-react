/**
 * ASSUMPTIONS:
 * - The user's category names in Quicken do not include any colons. Colons are assumed to seperate levels in the
 *   category hierarchy.
 */

export interface ICategoryModel {
  categories: [];
}

const CategoryModel = function (this: ICategoryModel, categories) {
  this.categories = categories;
};

CategoryModel.prototype = {
  getParent: function (category) {
    const parent = this.categories.find(function (element) {
      return (
        element.Category == category && element["Parent Category"] != category
      );
    });

    const result = parent ? parent["Parent Category"] : null;

    return result;
  },

  getChildren: function (category) {
    const result = [];
    const children = this.categories.filter(function (element) {
      return (
        element["Parent Category"] == category && element.Category != category
      );
    });

    for (let i = 0; i < children.length; i++) {
      result.push(children[i].Category);
    }

    return result;
  },

  getType: function (category) {
    console.log("categories: ", this.categories);
    const result = this.categories.find(function (element) {
      return element.nodeId == category;
    });

    console.log("getType result: ", result);

    if (result) {
      if (
        result.nodeId == "Income" ||
        result["Parent Category"] == "Income" ||
        result.nodeId.slice(0, 6) == "Income"
      ) {
        return "Income";
      } else {
        return "Expense";
      }
    } else {
      return null;
    }
  },

  isEnvelope: function (category) {
    const result = this.categories.find(function (element) {
      return element.Category == category;
    });

    if (result) {
      return result.Envelope;
    } else {
      return null;
    }
  },
};

export default CategoryModel;
