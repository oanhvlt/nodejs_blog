const exp = require('express');
const morgan = require('morgan');
const { engine } = require("express-handlebars");
const path = require('path');
//call route
const route = require('./routes');
//connect db
const db = require('./config/db');
//call oblect connect
db.connect();

const app = exp();
const port = 3000;

//HTTP logger
//app.use(morgan('combined'));

//use static file: show logo by route http://localhost:3000/img/logo.png
app.use(exp.static(path.join(__dirname,'public')));

//call midleware of express to save data to form data (red.body)
app.use(exp.urlencoded({
  extended: true
}));
//call midleware of express to get data from javacript library(httpXML, ajax, fetch, axios,...)
app.use(exp.json());

//template engine
app.engine('hbs', engine({//config file name from .handlebars to .hbs
    extname: '.hbs' //config file name from .handlebars to .hbs
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));
//console.log('dir: ',path.join(__dirname, 'resources/views'));

//route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});