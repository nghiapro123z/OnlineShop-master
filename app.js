const express = require('express');
const engines = require('consolidate');
const app = express();

var port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

var indexController = require('./index.js');
app.use('/',indexController);

var productController = require('./product.js');
app.use('/product',productController);

var userController = require('./user.js');
app.use('/user',userController);

app.listen(port);