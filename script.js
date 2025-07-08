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
function Denomination() {
  let amountEUR = parseFloat(document.getElementById("changeEUR").value);
  let amountBGN = parseFloat(document.getElementById("changeBGN").value);

  const denominations = [
    500, 200, 100, 50, 20, 10, 5, 2, 1,
    0.5, 0.2, 0.1, 0.05, 0.02, 0.01
  ];

  const countsEUR = {};
  const countsBGN = {};

  let remainingEUR = Math.round(amountEUR * 100);
  let remainingBGN = Math.round(amountBGN * 100);

  denominations.forEach(denom => {
    const denomInCents = Math.round(denom * 100);

    // EUR Denominations
    const countEUR = Math.floor(remainingEUR / denomInCents);
    if (countEUR > 0) {
      countsEUR[denom] = countEUR;
      remainingEUR -= countEUR * denomInCents;
    }

    // BGN Denominations
    const countBGN = Math.floor(remainingBGN / denomInCents);
    if (countBGN > 0) {
      countsBGN[denom] = countBGN;
      remainingBGN -= countBGN * denomInCents;
    }
  });


  // Render result
  let outputEUR = '<ul class="list-group">';
  Object.keys(countsEUR)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach(denom => {
      const count = countsEUR[denom]; // ✅ CORRECT variable
      const label = denom >= 5 ? `€${denom}` :
        denom >= 1 ? `€${denom}` :
          `${Math.round(denom * 100)}¢`;
      outputEUR += `<li class="list-group-item d-flex justify-content-between">
                    <span>${label}</span>
                    <span>x ${count}</span>
                  </li>`;
    });

  //Lev denomination
  let outputBGN = '<ul class="list-group">';
  Object.keys(countsBGN)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach(denom => {
      const count = countsBGN[denom]; // ✅ CORRECT variable
      const label = denom >= 1 ? `${denom} лв.` :
        `${Math.round(denom * 100)} ст.`;
      outputBGN += `<li class="list-group-item d-flex justify-content-between">
                    <span>${label}</span>
                    <span>x ${count}</span>
                  </li>`;
    });
  document.getElementById('resultBGN').innerHTML = outputBGN;
  document.getElementById('resultEUR').innerHTML = outputEUR;
}