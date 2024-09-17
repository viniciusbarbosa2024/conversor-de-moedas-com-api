const value1 = document.getElementById('value1')
const value2 = document.getElementById('value2')
const currency1 = document.getElementById('currency1')
const currency2 = document.getElementById('currency2')

document.addEventListener('DOMContentLoaded',callAPI)

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

async function callAPI() {
    const res = await fetch('https://cdn.moeda.info/api/latest.json')

    const data = await res.json()

    const currencies = clearCurrenciesList(Object.keys(data.rates))

    

    insertOptionsInSelect(currencies,currency1)
    insertOptionsInSelect(currencies,currency2)
    
    
}


