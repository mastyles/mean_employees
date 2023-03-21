const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');

app.listen(3000, () => console.log('Server started at port 3000'));

app.use('/employees', employeeController);

// dev branch created. This comment will be removed at the end later.