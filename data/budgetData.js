import budgetObject from "./budget.json" assert { type: "json" };

for (const [key, value] of Object.entries(budgetObject)) {
  console.log(`key: ${key}, value: ${value}`);
}
