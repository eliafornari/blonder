"use strict"

let express = require("express");
let bodyParser = require('body-parser');
let routes  = require('./routes');
let path = require('path');
var util = require('util');
let ejs = require('ejs');
let tour  = require('./tour/tour.js');
let app = express();



app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../client');
app.use( express.static(__dirname + "/../client") );
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/tour/:artist/get', function(req, res){
  tour.get(req, res);
});




app.get('*', routes.index);

app.listen(8081, () => console.log("listening on 8081"));
