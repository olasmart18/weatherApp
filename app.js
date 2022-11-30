const express = require('express');
const bodyParser = require('body-parser');
const https = require('http');


const app = express();

app.get('/', (req, res) => {
    res.send('wlcm to coding')
})

app.listen(port () => {
    console.log(`server is running on port ${}`);
})