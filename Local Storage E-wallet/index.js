if (localStorage.getItem('balance') == null) {
  localStorage.setItem('balance', 2000);
}
let passwordInput = document.querySelector("#password");
let balanceP = document.querySelector("#balance");
let showButton = document.querySelector("#showBtn");
let actionsDiv = document.querySelector("#actions");
let amountInput = document.querySelector("#amount");
let table = document.querySelector("table tbody");

if (localStorage.getItem('myLogs') == null) {
  localStorage.setItem('myLogs', JSON.stringify([]));
}

let logs = JSON.parse(localStorage.getItem('myLogs'));

function showPassword() {
  if (passwordInput.classList.contains("d-none")) {
    passwordInput.classList.replace("d-none", "d-block");
  } else {
    if (passwordInput.value == "1234") {
      balanceP.innerText = localStorage.getItem('balance');
      passwordInput.remove();
      showButton.remove();
      actionsDiv.classList.replace("d-none", "d-flex");
      renderLogs();
    } else {
      alert("Wrong Password");
    }
  }
}

function deposit() {
  let oBalance = localStorage.getItem('balance');
  localStorage.setItem('balance', parseFloat(localStorage.getItem('balance')) + +amountInput.value);
  balanceP.innerText = localStorage.getItem('balance');
  let obj = {
    beforeBalance: oBalance,
    type: "deposit",
    amount: +amountInput.value,
    afterBalance: localStorage.getItem('balance'),
  };
  logs.push(obj);
  localStorage.setItem('myLogs', JSON.stringify(logs));
  renderLogs();
}

function withdraw() {
  if (+amountInput.value <= localStorage.getItem('balance')) {
    let oBalance = localStorage.getItem('balance');
    localStorage.setItem('balance', parseFloat(localStorage.getItem('balance')) - +amountInput.value);
    balanceP.innerText = localStorage.getItem('balance');

    let obj = {
      beforeBalance: oBalance,
      type: "withdraw",
      amount: +amountInput.value,
      afterBalance: localStorage.getItem('balance'),
    };
    logs.push(obj);
    localStorage.setItem('myLogs', JSON.stringify(logs));
    renderLogs();
  } else {
    alert("انت كحيان يلا");
  }
}

function renderLogs() {
  table.innerHTML = "";
  logs.forEach((log, index) => {
    let buttonId = `${index}`;
    table.innerHTML += `
      <tr>
        <th>${index + 1}</th>
        <th>${log.beforeBalance}</th>
        <th>${log.type}</th>
        <th>${log.amount}</th>
        <th>${log.afterBalance}</th>
<th>
  <button id="${buttonId}" class="btn btn-sm btn-danger" 
          onclick="
            if (JSON.parse(localStorage.getItem('myLogs'))[this.id].type  == 'withdraw') {
              localStorage.setItem('balance', parseFloat(localStorage.getItem('balance')) + JSON.parse(localStorage.getItem('myLogs'))[this.id].amount);
            } else {
              localStorage.setItem('balance', parseFloat(localStorage.getItem('balance')) - JSON.parse(localStorage.getItem('myLogs'))[this.id].amount);
            }
            logs.splice(this.id,1);
            localStorage.setItem('myLogs', JSON.stringify(logs));
            balanceP.innerText = localStorage.getItem('balance'); 
            renderLogs();">
    Undo Operation
  </button>
</th>
      </tr>
    `;
  });
}




