const value1 = document.getElementById('value1')
const value2 = document.getElementById('value2')
const currency1 = document.getElementById('currency1')
const currency2 = document.getElementById('currency2')

document.addEventListener('DOMContentLoaded',useApiData)

currency1.addEventListener('change',convertCurrency)
currency2.addEventListener('change',convertCurrency)

function insertOptionsInSelect(currencies,selectHTML) {
    currencies.forEach((element,index) => {
        const createOption = document.createElement('option')
        
        selectHTML.appendChild(createOption)

        selectHTML.children[index].innerHTML = element
        selectHTML.children[index].value = `${element}`
    }) 
}

function clearCurrenciesList(currenciesList) {
    //Removendo alguns dados incorretos vindos da API

    currenciesList.splice(currenciesList.indexOf('VEF_BLKMKT'),3)

    return currenciesList
}

async function convertCurrency() {
   const data = await getDataFromApi()
   
   const currency1ValueInDollars = data.rates[`${currency1.value}`]
   const currency2ValueInDollars = data.rates[`${currency2.value}`]

   
}

async function getDataFromApi() {
    const res = await fetch('https://cdn.moeda.info/api/latest.json')

    const data = await res.json()

    return data
}

async function useApiData() {
    const data = await getDataFromApi()

    const currencies = clearCurrenciesList(Object.keys(data.rates))

    

    insertOptionsInSelect(currencies,currency1)
    insertOptionsInSelect(currencies,currency2)

    currency1.value = 'USD'
    currency2.value = 'USD'

    console.log(data)
    
}




