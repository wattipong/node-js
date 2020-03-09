const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const os = require('os');
const helmet = require('helmet');

const http = require('http');
//Import Routes
const usersRouter = require('./routes/users');

//Connecting DataBase
const mysqlconecting = require('./configs/connect');
mysqlconecting;

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Call Routes
app.use('/users', usersRouter);

//Fix Port Run Internal
http.createServer(app).listen(8080)

//Fix Runing External
//app.listen(process.env.PORT || process.env.PORT_SERVER, () => console.log('express server listenting on - http://' + os.hostname() + ':' + process.env.PORT));




module.exports = app;
