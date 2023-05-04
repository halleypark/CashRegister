function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let changeInPennies = cash*100 - price*100;
  let registerTotal = 0;
  for (let i = 0; i < cid.length; i++){
    registerTotal += cid[i][1];
  }
  const currencyInPennies = {
    'ONE HUNDRED': 10000,
    'TWENTY': 2000,
    'TEN': 1000,
    'FIVE': 500,
    'ONE': 100,
    'QUARTER': 25,
    'DIME': 10,
    'NICKEL': 5,
    'PENNY': 1
    }
  if (change > registerTotal){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  else if (change === registerTotal){
    return {status: "CLOSED", change: cid};
  }
  else{
    let reversedCid = cid.reverse();
    let returnedArray = [];
    for (let unit of reversedCid){
      let registerArray = [unit[0], 0]
      unit[1] *= 100;
      while (changeInPennies >= currencyInPennies[unit[0]] && unit[1] > 0){
        unit[1] -= currencyInPennies[unit[0]];
        changeInPennies -= currencyInPennies[unit[0]];
        registerArray[1] += currencyInPennies[unit[0]];
      }
      if (registerArray[1] > 0){
        registerArray[1] /= 100;
        returnedArray.push(registerArray)
      }
    }
    if (changeInPennies === 0){
      return {status: "OPEN", change: returnedArray};
    }
    else if (changeInPennies > 0){
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
  }
}