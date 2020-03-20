const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const os = require('os');
const rateLimit = require("express-rate-limit");
//Import Routes
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
//Middlewares
const passportJWT = require('./middlewares/passport.jwt')();
const errorHandler = require('./middlewares/error.handler');
var https = require('https');
var fs = require('fs');

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());


//Fix Port Run Internal
//http.createServer(app).listen(8080)

app.set('trust proxy');
const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 5 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passportJWT.initialize());

//Call Routes
app.use('/users', usersRouter);
app.use('/products', productRouter);

app.use(errorHandler);

//app.listen(process.env.PORT || process.env.PORT_SERVER, () => console.log('express server listenting on - http://' + os.hostname() + ':' + process.env.PORT_SERVER ));




module.exports = app;
