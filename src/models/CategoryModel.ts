/**
 * ASSUMPTIONS:
 * - The user's category names in Quicken do not include any colons. Colons are assumed to seperate levels in the
 *   category hierarchy.
 * - For now, just assuming that a category can only have one parent.
 */

export interface ICategoryModel {
  categories: ICategory[];
  getParent(category: string): void;
  getChildren(category: string): void;
  getType(category: string): void;
  isEnvelope(category: string): void;
}

export interface ICategory {
  envelope: boolean;
  nodeId: string;
}

class CategoryModel implements ICategoryModel {
  categories: ICategory[];

  constructor(categories: ICategory[]) {
    this.categories = categories;
  }

  getParent(category: string) {
    // Does the category name have a colon?
    const colonIndex = category.indexOf(":");

    if (colonIndex > -1) {
      const parent = category.slice(0, colonIndex);
      console.log("parent:");
      console.log(parent);
      return parent;
    }
    return null;
  }

  getChildren(category: string) {
    const result = [];

    // Does the category name have a colon?
    const colonIndex = category.indexOf(":");

    // If no colon, then it's a parent
    // TODO: Account for more than one level of children.
    if (colonIndex === -1) {
      const children = this.categories.filter(function (element) {
        let parent = "";
        const colonIndex = element.nodeId.indexOf(":");

        if (colonIndex > -1) {
          parent = category.slice(0, colonIndex);
        }

        return parent === category && element.nodeId !== category;
      });

      for (let i = 0; i < children.length; i++) {
        result.push(children[i].nodeId);
      }
    }

    return result;
  }

  getType(category: string) {
    const result = this.categories.find(function (element) {
      return element.nodeId == category;
    });

    console.log("getType result: ", result);

    if (result) {
      if (result.nodeId.slice(0, 6) == "Income") {
        return "Income";
      } else {
        return "Expense";
      }
    } else {
      return null;
    }
  }

  isEnvelope(category: string) {
    const result = this.categories.find(function (element) {
      return element.nodeId == category;
    });

    if (result) {
      return result.envelope;
    } else {
      return null;
    }
  }
}

export default CategoryModel;
