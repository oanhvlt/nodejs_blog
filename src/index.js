const exp = require('express');
const morgan = require('morgan');
const { engine } = require("express-handlebars");
const path = require('path');

const app = exp();
const port = 3000;

//HTTP logger
app.use(morgan('combined'));

//use static file: show logo by route http://localhost:3000/img/logo.png
app.use(exp.static(path.join(__dirname,'public')));

//template engine
app.engine('hbs', engine({//config file name from .handlebars to .hbs
    extname: '.hbs' //config file name from .handlebars to .hbs
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
console.log('dir: ',path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});