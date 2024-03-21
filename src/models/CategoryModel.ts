/**
 * ASSUMPTIONS:
 * - Category names in Quicken are in this format:
 *   - Parent Category:Category
 *     ...where the Parent Category and the Category do not include any colons. The colon is
 *     assumed to seperate the Parent Category from the Category.
 * - A category can only have one parent (for now).
 * - Category names are unique. When searching on category name, only one result will be returned.
 */

// TODO: Add ability to edit envelope status.
import { ICategory } from "../types/Category";

export interface ICategoryModel {
  categories: ICategory[];
  getParent(category: string): string | null;
  getChildren(category: string): string[];
  getType(category: string): string;
  isEnvelope(category: string): boolean;
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
      return category.slice(0, colonIndex);
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
        const colonIndex = element.name.indexOf(":");

        if (colonIndex > -1) {
          parent = category.slice(0, colonIndex);
        }

        return parent === category && element.name !== category;
      });

      for (let i = 0; i < children.length; i++) {
        result.push(children[i].nodeId);
      }
    }

    return result;
  }

  getType(category: string) {
    if (category.slice(0, 6) == "Income") {
      return "Income";
    } else {
      return "Expense";
    }
  }

  isEnvelope(category: string) {
    const result = this.categories.find(function (element) {
      return element.name == category;
    });

    if (result) {
      return result.envelope;
    } else {
      return false;
    }
  }
}

export default CategoryModel;
