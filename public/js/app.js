const searchForm = document.querySelector('form')
const inputValue = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

searchForm.addEventListener('submit', (e) => {

    const location = inputValue.value
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.weather
            }
        })
    })

})