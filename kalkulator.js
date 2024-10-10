let display = document.getElementById('display');
let angka1 = '';
let angka2 = '';
let operator = '';
let historyList = document.getElementById('historyList');
let history = JSON.parse(localStorage.getItem('history')) || [];

function tambah(angka) {
  if (operator === '') {
    angka1 += angka;
  } else {
    angka2 += angka;
  }
  display.value = angka1 + operator + angka2;
}

function kali() {
  operator = '*';
  display.value = angka1 + operator;
}

function bagi() {
  operator = '/';
  display.value = angka1 + operator;
}

function kurang() {
  operator = '-';
  display.value = angka1 + operator;
}

function tambahOperator() {
  operator = '+';
  display.value = angka1 + operator;
}

function samaDengan() {
  let hasil = eval(angka1 + operator + angka2);
  display.value = hasil;
  addHistory(angka1, operator, angka2, hasil);
  angka1 = '';
  angka2 = '';
  operator = '';
}

function clear() {
  display.value = '0';
  angka1 = '';
  angka2 = '';
  operator = '';
}

function addHistory(angka1, operator, angka2, hasil) {
  let row = document.createElement('tr');
  row.innerHTML = `
    <td>${angka1}</td>
    <td>${operator}</td>
    <td>${angka2}</td>
    <td>${hasil}</td>
  `;
  historyList.appendChild(row);
  history.push({ angka1, operator, angka2, hasil });
  localStorage.setItem('history', JSON.stringify(history));
}

function addHistory(angka1, operator, angka2, hasil) {
  let row = document.createElement('tr');
  row.innerHTML = `
    <td>${angka1}</td>
    <td>${operator}</td>
    <td>${angka2}</td>
    <td>${hasil}</td>
    <td><button class="hapus-tunggal">Hapus</button></td>
  `;
  historyList.appendChild(row);
  history.push({ angka1, operator, angka2, hasil });
  localStorage.setItem('history', JSON.stringify(history));
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach((item, index) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.angka1}</td>
      <td>${item.operator}</td>
      <td>${item.angka2}</td>
      <td>${item.hasil}</td>
      <td><button class="hapus-tunggal" data-index="${index}">Hapus</button></td>
    `;
    historyList.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHistory();
  const hapusSemuaButton = document.getElementById('hapus-semua');
  hapusSemuaButton.addEventListener('click', () => {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
  });
  historyList.addEventListener('click', (e) => {
    if (e.target.classList.contains('hapus-tunggal')) {
      const index = e.target.dataset.index;
      history.splice(index, 1);
      localStorage.setItem('history', JSON.stringify(history));
      renderHistory();
    }
  });
});

renderHistory();
document.getElementById('tombol-clear').addEventListener('click', clear);