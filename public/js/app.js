console.log('Client side js running')

// fetch('http://puzzle.mead.io/puzzle').then((Response) => {
//     Response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message')
const msg2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    msg1.textContent = 'Loading Message'

    fetch('/weather?address='+ location).then((Response) => {
        Response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })

})