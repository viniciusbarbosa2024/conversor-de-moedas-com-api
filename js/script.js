const valueToConvert = document.getElementById('valueToConvert')
const optionUSD = document.getElementById('USD')
const optionEUR = document.getElementById('EUR')
const optionGBP = document.getElementById('GBP')
const convertButton = document.getElementById('convertButton')
const result = document.getElementById('result')

const exchangeUSD = 5.54
const exchangeEUR = 6.04
const exchangeGBP = 7.16

convertButton.addEventListener('click',() => generalFunction(identifyExchange()))

valueToConvert.focus()

function identifyExchange() {
    //Identifica para qual moeda será a conversão
    if (optionUSD.checked) {
        return 'USD'
    } else if (optionEUR.checked){
        return 'EUR'
    } else if (optionGBP.checked) {
        return 'GBP'
    }
}

function identifyExchangeTax(exchange) {
    //Retorna a taxa de câmbio associada a moeda para qual ocorrerá a conversão
    switch(exchange) {
        case 'USD':
            return exchangeUSD
            break
        case 'EUR': 
            return exchangeEUR
            break
        case 'GBP':
            return exchangeGBP
            break

    }

}



function generalFunction(exchange) {
    let exchangeTax = identifyExchangeTax(exchange)
    
    let convertedValue = () => Number(valueToConvert.value)/exchangeTax

    result.innerHTML = `${Number(valueToConvert.value).toLocaleString('pt-br',{style: 'currency',currency: 'BRL'})} em ${exchange} é: ${convertedValue().toLocaleString('pt-br',{style:'currency',currency: exchange})}`

    valueToConvert.value = ''
}

