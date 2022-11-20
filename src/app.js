const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const pubDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handle bar engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App HSB',
        name: 'MilindKt'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me HSB',
        name: 'MilindKT'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help HSB',
        description: 'This page is help you navigate the website',
        'name': 'Milind KT'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'Please provide a valid address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, { weather_desc, current_temp, feels_like } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                place: place,
                weather_desc: weather_desc,
                current_temp: current_temp,
                feels_like: feels_like
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            'error': 'You must provide a search tearm'
        })
    }
    console.log(req.query.search);
    res.send({
        'products': []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMsg: 'Help article page not available'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMsg: 'Page not available'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});


/* app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew',
        place: 'Blr',
        age: 27
    }, {
        name: 'Sarah',
        place: 'Blr',
        age: 25
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
})

Url to website like:
app.com
app.com/about
app.com/help */