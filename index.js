const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const bodyParser = require('body-parser');
const cors = require('cors'); 


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Unable to connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 
}
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication); 
app.use('/blogs', blogs); 


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

//http://localhost:8080
app.listen(8080, () => {
    console.log('Listening on port 8080');
});