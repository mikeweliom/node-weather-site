console.log('Client side javascript file loaded')

/* fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
}); */

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFore = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    //
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = error;
            } else {
                messageOne.textContent = data.place;
                messageTwo.textContent = "Current Temprature in " + data.current_temp + " *C";
                messageThree.textContent  = "Feels Like:" + data.feels_like + " *C";
                messageFore.textContent = "Weather Description: " + data.weather_desc;
                messageFive.textContent = "Local date time: " + data.datetimestamp;
            }
        })
    })
})