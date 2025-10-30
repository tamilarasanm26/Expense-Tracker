// ====== Toggle Form Visibility ======
const showFormBtn = document.getElementById('showFormBtn');
const formSection = document.getElementById('formSection');

showFormBtn.addEventListener('click', () => {
  if (formSection.style.display === 'none') {
    formSection.style.display = 'block';
    showFormBtn.textContent = 'Close Form';
  } else {
    formSection.style.display = 'none';
    showFormBtn.textContent = '+ Add Transaction';
  }
});



const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const datetime = document.getElementById('datetime');

let transactions = [];

// Date & Time Updater 
function getCurrentDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('en-IN');
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return `${date} ${time}`;
}

datetime.value = getCurrentDateTime();
setInterval(() => {
  datetime.value = getCurrentDateTime();
}, 1000);

//  Form Handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const desc = text.value.trim();
  const amt = parseFloat(amount.value);
  const transactionType = type.value;
  const timeStamp = getCurrentDateTime();

  if (desc === '' || isNaN(amt) || amt <= 0) {
    alert('Please enter a valid description and an amount greater than 0');
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amt,
    transactionType,
    timeStamp
  };

  transactions.push(transaction);
  renderTransaction(transaction);
  updateBalance();

  text.value = '';
  amount.value = '';
});

// Render Each Transaction
function renderTransaction(transaction) {
  const li = document.createElement('li');
  li.setAttribute('data-id', transaction.id);
  li.classList.add(transaction.transactionType === 'income' ? 'plus' : 'minus');
  li.innerHTML = `
    <div>
      ${transaction.transactionType.toUpperCase()} - ${transaction.desc.toUpperCase()}<br>
      <small>${transaction.timeStamp}</small>
       <span class="amount-text">${transaction.transactionType === 'income' ? '+' : '-'}₹${transaction.amt.toFixed(2)}</span>
    </div>
   
    <div class="actions">
      <button class="edit-btn">✏️</button> 
      <button class="delete-btn">🗑️</button>
    </div>
  `;
  list.appendChild(li);
}

// Update Balance & Chart
function updateBalance() {
  let income = 0, expense = 0;

  transactions.forEach(t => {
    if (t.transactionType === 'income') income += t.amt;
    else expense += t.amt;
  });

  const totalBalance = income - expense;

  balance.innerText = `₹${totalBalance.toFixed(2)}`;
  document.getElementById('income').innerText = `₹${income.toFixed(2)}`;
  document.getElementById('expense').innerText = `₹${expense.toFixed(2)}`;

  balance.style.color = totalBalance < 0 ? 'red' : 'green';

  //  Update bar chart
  renderChart(income, expense);
}

//  Edit & Delete Transactions 
list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const id = Number(li.getAttribute('data-id'));
  const transaction = transactions.find(t => t.id === id);

  if (e.target.classList.contains('delete-btn')) {
    transactions = transactions.filter(t => t.id !== id);
    li.remove();
    updateBalance();
  }

  if (e.target.classList.contains('edit-btn')) {
    const newAmount = prompt(`Enter new amount for "${transaction.desc}"`, transaction.amt);
    if (newAmount === null) return;

    const updatedAmt = parseFloat(newAmount);
    if (isNaN(updatedAmt) || updatedAmt <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    transaction.amt = updatedAmt;
    li.querySelector('.amount-text').textContent =
      `${transaction.transactionType === 'income' ? '+' : '-'}₹${updatedAmt.toFixed(2)}`;
    updateBalance();
  }
});

// ECharts Setup
const chartDom = document.getElementById('chart');
let myChart = echarts.init(chartDom);

function renderChart(income, expense) {
  const option = {
    title: {
      text: 'Income vs Expense',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Income', 'Expense']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [income, expense],
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          color: (params) => (params.dataIndex === 0 ? '#4CAF50' : '#F44336')
        },
        label: {
          show: true,
          position: 'top',
          formatter: '₹{c}'
        }
      }
    ],
    animationDuration: 800
  };

  myChart.setOption(option);
}

//  Initialize Chart on Load 
renderChart(0, 0);
