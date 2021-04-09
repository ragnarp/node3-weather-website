const search = document.querySelector('input')
const form = document.querySelector('form')
const msg_1 = document.querySelector('#message-1')
const msg_2 = document.querySelector('#error-1')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msg_1.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        msg_1.textContent = 'Loading...'
        msg_2.textContent = ''
        response.json().then((data) => {
            if (data.error) {
                msg_1.textContent = data.error
                msg_2.textContent = ''
            } else {
                console.log(data)
                msg_1.textContent = data.location
                msg_2.textContent = data.forecast
            }
        })
    })
})