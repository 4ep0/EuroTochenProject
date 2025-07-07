function CurrencyCalculator() {
    // Money given in BGN
    const moneyInput = parseFloat(document.getElementById('moneyGiven').value);
    // BIll in EUR
    const billInput = parseFloat(document.getElementById("billAmount").value);
    const course = 1.95583;

    let moneyGivenEUR = moneyInput / course;
    if (moneyGivenEUR > billInput) {
        let changeEUR = moneyGivenEUR - billInput;
        let changeBGN = changeEUR * course;

        let roundedMoneyEUR = roundUp(changeEUR, 2);
        let roundedMoneyBGN = roundUp(changeBGN, 2);
        // document.getElementById('convOutput').textContent= roundedMoney;
        console.log("Rounded money in euro=", roundedMoneyEUR);
        console.log("Rounded money in leva=", roundedMoneyBGN);

        document.getElementById("changeBGN").value = roundedMoneyBGN;
        document.getElementById("changeEUR").value = roundedMoneyEUR;
    }
    else console.log("Smetkata e po golqma ot dadenite pari");
}
function roundUp(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.ceil(num * factor) / factor;
}
function DenominationEUR() {
    let amount = parseFloat(document.getElementById("changeEUR").value);
    
  if (isNaN(amount) || amount <= 0) {
    document.getElementById('result').innerHTML = '<div class="alert alert-danger">Please enter a valid positive amount.</div>';
    return;
  }

  const denominations = [
    500, 200, 100, 50, 20, 10, 5, 2, 1,
    0.5, 0.2, 0.1, 0.05, 0.02, 0.01
  ];

  const counts = {};
  let remaining = Math.round(amount * 100); // Work in cents to avoid floating-point issues

  denominations.forEach(denom => {
    const denomInCents = Math.round(denom * 100);
    const count = Math.floor(remaining / denomInCents);
    if (count > 0) {
      counts[denom] = count;
      remaining -= count * denomInCents;
    }
  });

  // Render result
  let output = '<ul class="list-group">';
  Object.keys(counts)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach(denom => {
      const count = counts[denom];
      const label = denom >= 5 ? `€${denom} note` :
                    denom >= 1 ? `€${denom} coin` :
                    `${Math.round(denom * 100)}¢ coin`;
      output += `<li class="list-group-item d-flex justify-content-between">
                   <span>${label}</span>
                   <span>x ${count}</span>
                 </li>`;
    });
  output += '</ul>';

  document.getElementById('result').innerHTML = output;
}
