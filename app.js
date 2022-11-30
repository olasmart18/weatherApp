const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const env = require('dotenv').config();
const { PORT} = process.env;


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 4000 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apikey = process.env.APIKEY;
    let url= "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apikey + "";


    https.get(url, (response) => {
        response.on('data', (data) => {
            let weatherType = JSON.parse(data);
            const temp = weatherType.main.temp;
            const icon = weatherType.weather[0].icon;
            const description = weatherType.weather[0].description;
            const imageUrl ="https://openweathermap.org/img/wn/" + icon + "@2x.png";


            res.write(`<p> The weather in ${query} is like ${description}</p>`);
            res.write(`<h2> The temprature in ${query} is ${temp} degree celcius</h2>`)
            res.write(`<img src = ${imageUrl}>`);
            res.send();

        })
    })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    // console.error(error.message);
})