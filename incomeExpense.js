// incomeExpense.js

// Create Income and Expense display section
const summaryContainer = document.getElementById('summary-container');

summaryContainer.innerHTML = `
  <section class="summary">
    <div class="summary-box income-box">
      <h4>Income</h4>
      <p id="income-amount">₹0</p>
    </div>

    <div class="summary-box expense-box">
      <h4>Expense</h4>
      <p id="expense-amount">₹0</p>
    </div>
  </section>
`;

// Expose helper functions to update income and expense
window.updateIncomeExpense = function (income, expense) {
  const incomeAmount = document.getElementById('income-amount');
  const expenseAmount = document.getElementById('expense-amount');

  incomeAmount.textContent = `₹${income.toFixed(2)}`;
  expenseAmount.textContent = `₹${expense.toFixed(2)}`;
};
