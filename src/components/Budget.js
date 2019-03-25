import React from 'react';
import BudgetTable from './BudgetTable';
import CategoryLookup from '../lib/Categories';
import '../css/bootstrap/css/bootstrap.css';
import '../css/style.css';

class Budget extends React.Component {
  constructor(props) {
    super(props);

    this.categoryLookup = new CategoryLookup();
    this.categoryLookup.assignRows(allCategories);
  }

  render() {
    const year = '2018';

    return (
      <BudgetTable
        year={ year }
        categoryLookup={ this.categoryLookup } />
    );
  }

}

export default Budget;

const allCategories = 
{
  "ATM%20Fee" : {
    "Category" : "ATM Fee",
    "Envelope" : false,
    "Parent Category" : "Fees & Charges"
  },
  "Advertising" : {
    "Category" : "Advertising",
    "Envelope" : false,
    "Parent Category" : "Business Services"
  },
  "Air%20Travel" : {
    "Category" : "Air Travel",
    "Envelope" : false,
    "Parent Category" : "Travel"
  },
  "Alcohol%20%26%20Bars" : {
    "Category" : "Alcohol & Bars",
    "Envelope" : false,
    "Parent Category" : "Food & Dining"
  },
  "Allowance" : {
    "Category" : "Allowance",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Amusement" : {
    "Category" : "Amusement",
    "Envelope" : false,
    "Parent Category" : "Entertainment"
  },
  "Arts" : {
    "Category" : "Arts",
    "Envelope" : false,
    "Parent Category" : "Entertainment"
  },
  "Auto%20%26%20Transport" : {
    "Category" : "Auto & Transport",
    "Envelope" : false,
    "Parent Category" : "Auto & Transport"
  },
  "Auto%20Insurance" : {
    "Category" : "Auto Insurance",
    "Envelope" : false,
    "Parent Category" : "Auto & Transport"
  },
  "Auto%20Repayment" : {
    "Category" : "Auto Repayment",
    "Envelope" : false,
    "Parent Category" : "Auto & Transport"
  },
  "Baby%20Supplies" : {
    "Category" : "Baby Supplies",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Babysitter%20%26%20Daycare" : {
    "Category" : "Babysitter & Daycare",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Bank%20Fee" : {
    "Category" : "Bank Fee",
    "Envelope" : false,
    "Parent Category" : "Fees & Charges"
  },
  "Bills%20%26%20Utilities" : {
    "Category" : "Bills & Utilities",
    "Envelope" : false,
    "Parent Category" : "Bills & Utilities"
  },
  "Birthday%20Parties" : {
    "Category" : "Birthday Parties",
    "Envelope" : true,
    "Parent Category" : "Kids"
  },
  "Bonus" : {
    "Category" : "Bonus",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Books" : {
    "Category" : "Books",
    "Envelope" : false,
    "Parent Category" : "Shopping"
  },
  "Books%20%26%20Supplies" : {
    "Category" : "Books & Supplies",
    "Envelope" : false,
    "Parent Category" : "Education"
  },
  "Business%20Services" : {
    "Category" : "Business Services",
    "Envelope" : false,
    "Parent Category" : "Business Services"
  },
  "Buy" : {
    "Category" : "Buy",
    "Envelope" : false,
    "Parent Category" : "Investments"
  },
  "Cash%20%26%20ATM" : {
    "Category" : "Cash & ATM",
    "Envelope" : false,
    "Parent Category" : "Uncategorized"
  },
  "Charity" : {
    "Category" : "Charity",
    "Envelope" : false,
    "Parent Category" : "Gifts & Donations"
  },
  "Child%20Support" : {
    "Category" : "Child Support",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Christmas%20Gifts" : {
    "Category" : "Christmas Gifts",
    "Envelope" : true,
    "Parent Category" : "Gifts & Donations"
  },
  "Closing%20Costs" : {
    "Category" : "Closing Costs",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Clothing" : {
    "Category" : "Clothing",
    "Envelope" : false,
    "Parent Category" : "Shopping"
  },
  "Coffee%20Shops" : {
    "Category" : "Coffee Shops",
    "Envelope" : false,
    "Parent Category" : "Food & Dining"
  },
  "Computer" : {
    "Category" : "Computer",
    "Envelope" : true,
    "Parent Category" : "Home"
  },
  "Creative%20Cloud" : {
    "Category" : "Creative Cloud",
    "Envelope" : false,
    "Parent Category" : "Bills & Utilities"
  },
  "Credit%20Card%20Payment" : {
    "Category" : "Credit Card Payment",
    "Envelope" : false,
    "Parent Category" : "Transfer"
  },
  "Dentist" : {
    "Category" : "Dentist",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "Deposit" : {
    "Category" : "Deposit",
    "Envelope" : false,
    "Parent Category" : "Investments"
  },
  "Dividend%20%26%20Gap%20Gains" : {
    "Category" : "Dividend & Gap Gains",
    "Envelope" : false,
    "Parent Category" : "Investments"
  },
  "Doctor" : {
    "Category" : "Doctor",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "Down%20Payment" : {
    "Category" : "Down Payment",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Education" : {
    "Category" : "Education",
    "Envelope" : false,
    "Parent Category" : "Education"
  },
  "Electronics%20%26%20Software" : {
    "Category" : "Electronics & Software",
    "Envelope" : false,
    "Parent Category" : "Shopping"
  },
  "Emergency%20Expenses" : {
    "Category" : "Emergency Expenses",
    "Envelope" : true,
    "Parent Category" : "Uncategorized"
  },
  "Entertainment" : {
    "Category" : "Entertainment",
    "Envelope" : false,
    "Parent Category" : "Entertainment"
  },
  "Eyecare" : {
    "Category" : "Eyecare",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "Fast%20Food" : {
    "Category" : "Fast Food",
    "Envelope" : false,
    "Parent Category" : "Food & Dining"
  },
  "Federal%20Tax" : {
    "Category" : "Federal Tax",
    "Envelope" : false,
    "Parent Category" : "Taxes"
  },
  "Fees%20%26%20Charges" : {
    "Category" : "Fees & Charges",
    "Envelope" : false,
    "Parent Category" : "Fees & Charges"
  },
  "Finance%20Charge" : {
    "Category" : "Finance Charge",
    "Envelope" : false,
    "Parent Category" : "Fees & Charges"
  },
  "Financial" : {
    "Category" : "Financial",
    "Envelope" : false,
    "Parent Category" : "Financial"
  },
  "Financial%20Advisor" : {
    "Category" : "Financial Advisor",
    "Envelope" : false,
    "Parent Category" : "Financial"
  },
  "Food%20%26%20Dining" : {
    "Category" : "Food & Dining",
    "Envelope" : false,
    "Parent Category" : "Food & Dining"
  },
  "Furnishings" : {
    "Category" : "Furnishings",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Gas%20%26%20Fuel" : {
    "Category" : "Gas & Fuel",
    "Envelope" : false,
    "Parent Category" : "Auto & Transport"
  },
  "Gift" : {
    "Category" : "Gift",
    "Envelope" : false,
    "Parent Category" : "Gifts & Donations"
  },
  "Gifted%20Income" : {
    "Category" : "Gifted Income",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Gifts%20%26%20Donations" : {
    "Category" : "Gifts & Donations",
    "Envelope" : false,
    "Parent Category" : "Gifts & Donations"
  },
  "Groceries" : {
    "Category" : "Groceries",
    "Envelope" : false,
    "Parent Category" : "Food & Dining"
  },
  "Gym" : {
    "Category" : "Gym",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "Hair" : {
    "Category" : "Hair",
    "Envelope" : false,
    "Parent Category" : "Personal Care"
  },
  "Health%20%26%20Fitness" : {
    "Category" : "Health & Fitness",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "Health%20Insurance" : {
    "Category" : "Health Insurance",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "Hobbies" : {
    "Category" : "Hobbies",
    "Envelope" : false,
    "Parent Category" : "Shopping"
  },
  "Home" : {
    "Category" : "Home",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Home%20Improvement" : {
    "Category" : "Home Improvement",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Home%20Insurance" : {
    "Category" : "Home Insurance",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Home%20Phone" : {
    "Category" : "Home Phone",
    "Envelope" : false,
    "Parent Category" : "Bills & Utilities"
  },
  "Home%20Services" : {
    "Category" : "Home Services",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Home%20Supplies" : {
    "Category" : "Home Supplies",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Hotel" : {
    "Category" : "Hotel",
    "Envelope" : false,
    "Parent Category" : "Travel"
  },
  "IRA%20Contribution" : {
    "Category" : "IRA Contribution",
    "Envelope" : false,
    "Parent Category" : "IRA Contribution"
  },
  "Income" : {
    "Category" : "Income",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Interest%20Income" : {
    "Category" : "Interest Income",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Internet" : {
    "Category" : "Internet",
    "Envelope" : false,
    "Parent Category" : "Bills & Utilities"
  },
  "Investments" : {
    "Category" : "Investments",
    "Envelope" : false,
    "Parent Category" : "Investments"
  },
  "Kids" : {
    "Category" : "Kids",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Kids%20Activities" : {
    "Category" : "Kids Activities",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Late%20Fee" : {
    "Category" : "Late Fee",
    "Envelope" : false,
    "Parent Category" : "Fees & Charges"
  },
  "Laundry" : {
    "Category" : "Laundry",
    "Envelope" : false,
    "Parent Category" : "Personal Care"
  },
  "Lawn%20%26%20Garden" : {
    "Category" : "Lawn & Garden",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Legal" : {
    "Category" : "Legal",
    "Envelope" : false,
    "Parent Category" : "Business Services"
  },
  "Life%20Insurance" : {
    "Category" : "Life Insurance",
    "Envelope" : false,
    "Parent Category" : "Financial"
  },
  "Loan%20Fees%20and%20Charges" : {
    "Category" : "Loan Fees and Charges",
    "Envelope" : false,
    "Parent Category" : "Loans"
  },
  "Loan%20Insurance" : {
    "Category" : "Loan Insurance",
    "Envelope" : false,
    "Parent Category" : "Loans"
  },
  "Loan%20Interest" : {
    "Category" : "Loan Interest",
    "Envelope" : false,
    "Parent Category" : "Loans"
  },
  "Loan%20Payment" : {
    "Category" : "Loan Payment",
    "Envelope" : false,
    "Parent Category" : "Loans"
  },
  "Loan%20Principal" : {
    "Category" : "Loan Principal",
    "Envelope" : false,
    "Parent Category" : "Loans"
  },
  "Loans" : {
    "Category" : "Loans",
    "Envelope" : false,
    "Parent Category" : "Loans"
  },
  "Local%20Tax" : {
    "Category" : "Local Tax",
    "Envelope" : false,
    "Parent Category" : "Taxes"
  },
  "Major%20Repair%2FUpgrade" : {
    "Category" : "Major Repair/Upgrade",
    "Envelope" : true,
    "Parent Category" : "Home"
  },
  "Misc%20Expenses" : {
    "Category" : "Misc Expenses",
    "Envelope" : false,
    "Parent Category" : "Misc Expenses"
  },
  "Misc%20Income" : {
    "Category" : "Misc Income",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Mobile%20Phone" : {
    "Category" : "Mobile Phone",
    "Envelope" : false,
    "Parent Category" : "Bills & Utilities"
  },
  "Mortgage%20%26%20Rent" : {
    "Category" : "Mortgage & Rent",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Move-in%20Upgrades" : {
    "Category" : "Move-in Upgrades",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Movies%20%26%20DVDs" : {
    "Category" : "Movies & DVDs",
    "Envelope" : false,
    "Parent Category" : "Entertainment"
  },
  "Moving%20Expenses" : {
    "Category" : "Moving Expenses",
    "Envelope" : false,
    "Parent Category" : "Home"
  },
  "Music" : {
    "Category" : "Music",
    "Envelope" : false,
    "Parent Category" : "Entertainment"
  },
  "Newspapers%20%26%20Magazines" : {
    "Category" : "Newspapers & Magazines",
    "Envelope" : false,
    "Parent Category" : "Entertainment"
  },
  "Office%20Supplies" : {
    "Category" : "Office Supplies",
    "Envelope" : false,
    "Parent Category" : "Business Services"
  },
  "Parking" : {
    "Category" : "Parking",
    "Envelope" : false,
    "Parent Category" : "Auto & Transport"
  },
  "Paycheck" : {
    "Category" : "Paycheck",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Personal%20Care" : {
    "Category" : "Personal Care",
    "Envelope" : false,
    "Parent Category" : "Personal Care"
  },
  "Pet%20Food%20%26%20Supplies" : {
    "Category" : "Pet Food & Supplies",
    "Envelope" : false,
    "Parent Category" : "Pets"
  },
  "Pet%20Grooming" : {
    "Category" : "Pet Grooming",
    "Envelope" : false,
    "Parent Category" : "Pets"
  },
  "Pets" : {
    "Category" : "Pets",
    "Envelope" : false,
    "Parent Category" : "Pets"
  },
  "Pharmacy" : {
    "Category" : "Pharmacy",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "Printing" : {
    "Category" : "Printing",
    "Envelope" : false,
    "Parent Category" : "Business Services"
  },
  "Professional%20License" : {
    "Category" : "Professional License",
    "Envelope" : false,
    "Parent Category" : "Education"
  },
  "Property%20Tax" : {
    "Category" : "Property Tax",
    "Envelope" : false,
    "Parent Category" : "Taxes"
  },
  "Public%20Transportation" : {
    "Category" : "Public Transportation",
    "Envelope" : false,
    "Parent Category" : "Auto & Transport"
  },
  "Reimbursement" : {
    "Category" : "Reimbursement",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Rental%20Car%20%26%20Taxi" : {
    "Category" : "Rental Car & Taxi",
    "Envelope" : false,
    "Parent Category" : "Travel"
  },
  "Rental%20Income" : {
    "Category" : "Rental Income",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Restaurants" : {
    "Category" : "Restaurants",
    "Envelope" : false,
    "Parent Category" : "Food & Dining"
  },
  "Returned%20Purchase" : {
    "Category" : "Returned Purchase",
    "Envelope" : false,
    "Parent Category" : "Income"
  },
  "Sales%20Tax" : {
    "Category" : "Sales Tax",
    "Envelope" : false,
    "Parent Category" : "Taxes"
  },
  "Sell" : {
    "Category" : "Sell",
    "Envelope" : false,
    "Parent Category" : "Investments"
  },
  "Service%20%26%20Parts" : {
    "Category" : "Service & Parts",
    "Envelope" : true,
    "Parent Category" : "Auto & Transport"
  },
  "Service%20Fee" : {
    "Category" : "Service Fee",
    "Envelope" : false,
    "Parent Category" : "Fees & Charges"
  },
  "Shipping" : {
    "Category" : "Shipping",
    "Envelope" : false,
    "Parent Category" : "Business Services"
  },
  "Shopping" : {
    "Category" : "Shopping",
    "Envelope" : false,
    "Parent Category" : "Shopping"
  },
  "Spa%20%26%20Massage" : {
    "Category" : "Spa & Massage",
    "Envelope" : false,
    "Parent Category" : "Personal Care"
  },
  "Sporting%20Goods" : {
    "Category" : "Sporting Goods",
    "Envelope" : false,
    "Parent Category" : "Shopping"
  },
  "Sports" : {
    "Category" : "Sports",
    "Envelope" : false,
    "Parent Category" : "Health & Fitness"
  },
  "State%20Tax" : {
    "Category" : "State Tax",
    "Envelope" : false,
    "Parent Category" : "Taxes"
  },
  "Student%20Loan" : {
    "Category" : "Student Loan",
    "Envelope" : false,
    "Parent Category" : "Education"
  },
  "Summer%20Camp" : {
    "Category" : "Summer Camp",
    "Envelope" : true,
    "Parent Category" : "Kids"
  },
  "Taxes" : {
    "Category" : "Taxes",
    "Envelope" : false,
    "Parent Category" : "Taxes"
  },
  "Television" : {
    "Category" : "Television",
    "Envelope" : false,
    "Parent Category" : "Bills & Utilities"
  },
  "Toys" : {
    "Category" : "Toys",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Trade%20Commissions" : {
    "Category" : "Trade Commissions",
    "Envelope" : false,
    "Parent Category" : "Fees & Charges"
  },
  "Transfer" : {
    "Category" : "Transfer",
    "Envelope" : false,
    "Parent Category" : "Transfer"
  },
  "Transfer%20for%20Cash%20Spending" : {
    "Category" : "Transfer for Cash Spending",
    "Envelope" : false,
    "Parent Category" : "Transfer"
  },
  "Travel" : {
    "Category" : "Travel",
    "Envelope" : false,
    "Parent Category" : "Travel"
  },
  "Tuition" : {
    "Category" : "Tuition",
    "Envelope" : false,
    "Parent Category" : "Education"
  },
  "Utilities" : {
    "Category" : "Utilities",
    "Envelope" : false,
    "Parent Category" : "Bills & Utilities"
  },
  "Vacation" : {
    "Category" : "Vacation",
    "Envelope" : true,
    "Parent Category" : "Travel"
  },
  "Veterinary" : {
    "Category" : "Veterinary",
    "Envelope" : false,
    "Parent Category" : "Pets"
  },
  "Water%20Bill" : {
    "Category" : "Water Bill",
    "Envelope" : true,
    "Parent Category" : "Bills & Utilities"
  },
  "Web%20Hosting%2FDomains" : {
    "Category" : "Web Hosting/Domains",
    "Envelope" : true,
    "Parent Category" : "Bills & Utilities"
  },
  "Weekend%20Activities" : {
    "Category" : "Weekend Activities",
    "Envelope" : false,
    "Parent Category" : "Kids"
  },
  "Withdrawal" : {
    "Category" : "Withdrawal",
    "Envelope" : false,
    "Parent Category" : "Investments"
  }
};
