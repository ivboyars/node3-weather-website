const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//e is event object
weatherForm.addEventListener('submit', (e) =>{
    //this code runs only after event happens
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageTwo.textContent = data.error
            console.log()
        }else{
            messageOne.textContent = 'Your location is ' + data.location 
            messageTwo.textContent = 'Forecast: ' + data.forecast
        }
    })
})

    console.log(location)
})