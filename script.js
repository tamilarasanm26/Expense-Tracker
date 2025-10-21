const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const balance = document.getElementById('balance');

let totalBalance = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const desc = text.value.trim();
  const amt = parseFloat(amount.value);

  if (desc === '' || isNaN(amt)) {
    alert('Please enter valid description and amount');
    return;
  }

 
  const li = document.createElement('li');
  li.innerHTML = `${desc} <span>₹${amt.toFixed(2)}</span>`;
  list.appendChild(li);

 
  totalBalance += amt;
  balance.innerText = `₹${totalBalance.toFixed(2)}`;

 
  if (totalBalance < 0) {
    balance.style.color = 'red';
  } else {
    balance.style.color = 'green';
  }

  
  text.value = '';
  amount.value = '';
});
