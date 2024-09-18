const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const currency1 = document.getElementById("currency1");
const currency2 = document.getElementById("currency2");
const invertButton = document.getElementById("invertButton");

document.addEventListener("DOMContentLoaded", useApiData);

currency1.addEventListener("change", convertCurrency);
currency2.addEventListener("change", convertCurrency);
value1.addEventListener("input", convertCurrency);
value2.addEventListener("input", convertCurrency);
invertButton.addEventListener('click',invertCurrencies)

function insertOptionsInSelect(currencies, selectHTML) {
  currencies.forEach((element, index) => {
    const createOption = document.createElement("option");

    selectHTML.appendChild(createOption);

    selectHTML.children[index].innerHTML = element;
    selectHTML.children[index].value = `${element}`;
  });
}

function invertCurrencies() {
    const valueFromTheFirstInput = value1.value
    const currencyFromTheFirstSelect = currency1.value

    currency1.value = currency2.value
    value1.value = value2.value


    currency2.value = currencyFromTheFirstSelect
    value2.value = valueFromTheFirstInput
}

function clearCurrenciesList(currenciesList) {
  //Removendo alguns dados incorretos vindos da API

  currenciesList.splice(currenciesList.indexOf("VEF_BLKMKT"), 3);

  return currenciesList;
}

async function convertCurrency(e) {
  const data = await getDataFromApi();

  const currency1ValueInDollars = data.rates[`${currency1.value}`];
  const currency2ValueInDollars = data.rates[`${currency2.value}`];

  // A cotação de uma moeda A numa moeda B é 1 A = currencyAInDollars/currencyBInDollars (Em B)

  if (e.target === value1) {
    value2.value =
      (value1.value * currency2ValueInDollars) / currency1ValueInDollars
  } else if (e.target === value2) {
    value1.value =
      (value2.value * currency1ValueInDollars) / currency2ValueInDollars
  }


}

async function getDataFromApi() {
  const res = await fetch("https://cdn.moeda.info/api/latest.json");

  const data = await res.json();

  return data;
}

async function useApiData() {
  const data = await getDataFromApi();

  const currencies = clearCurrenciesList(Object.keys(data.rates));

  insertOptionsInSelect(currencies, currency1);
  insertOptionsInSelect(currencies, currency2);

  currency1.value = "BRL";
  currency2.value = "USD";
}
