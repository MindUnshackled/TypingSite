const RANDOM_QUOTE = 'https://api.quotable.io/random?minLength=200'
const displayElement = document.getElementById('displayID')
const inputElement = document.getElementById('inputID')
const timerElement = document.getElementById('timerID')

inputElement.addEventListener('input', ()=>{
    const quotearray = displayElement.querySelectorAll('span')
    const value = inputElement.value.split('')

    if(timerElement.innerText == 60){
        startTimer()
    }

    let correct = true
    quotearray.forEach((characterSpan, index)=>{
        const character = value[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else{
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
    })

    if(correct)
        renderQuote()
})

function getQuote(){
   return fetch(RANDOM_QUOTE)
        .then(response=>response.json())
        .then(data=>data.content)
}

async function renderQuote(){
    const quote = await getQuote()
    displayElement.innerText = ''
    quote.split('').forEach(character=>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        displayElement.appendChild(characterSpan)
    })
    inputElement.value = null
}

let startTime
function startTimer(){
    timerElement.innerText = "60"
    timerElement.setAttribute('aria-valuenow', '60')
    timerElement.setAttribute('width', '100')
    startTime = new Date()
    setInterval(()=>{
        timerElement.innerText = getTime()
        let pcg = Math.floor(getTime()/60*100)
        timerElement.setAttribute('aria-valuenow', pcg)
        timerElement.setAttribute('style','width:'+Number(pcg)+'%')
    }, 1000)
}

function getTime(){
    return Math.floor(60-((new Date() - startTime)/1000))
}

renderQuote()