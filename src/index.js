const exp = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan');
const { engine } = require("express-handlebars");
const path = require('path');

//import middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware');

//call route
const route = require('./routes/indexRouter');

//connect db
const db = require('./config/db/indexDB');
//call oblect connect
db.connect();

const app = exp();
const port = 3000;

//HTTP logger
//app.use(morgan('combined'));

//use static file: show logo by route http://localhost:3000/public/img/logo.png
//this is middleware config static folder
//app.use(exp.static(path.join(__dirname)));  //or: app.use(exp.static(path.join(__dirname, 'public'))); 
app.use(exp.static(path.join(__dirname, 'public'))); 
console.log('dir: ',path.join(__dirname));

//exp.urlencoded: call this midleware to reconstruct and save data into object red.body (form data)
//must to use this middleware if you want to use red.body when submit
app.use(exp.urlencoded({
  extended: true
}));

//call midleware of express to get data from javacript library(httpXML, ajax, fetch, axios,...)
app.use(exp.json());



//methodOverride
app.use(methodOverride('_method'));

//this custom middleware apply all routers in app
//key 'use' include all functions name: get, post, put,...
app.use (SortMiddleware);
 
/** middleware soát vé vào cửa **/
// function bacBaoVe(req, res, next){ 
//   //có vé vào
//   if (['vethuong', 'vevip'].includes(req.query.ve)){
//     req.newFace = 'gach gach gach!';
//     return next();
//   }
//   //khi ko có vé
//   res.status(403).json({message: 'Access denied!'})
// }
// app.get('/middleware', 
//   //middleware 1
//   bacBaoVe,
//   //middleware 2
//   function(req, res, next){
//   res.json({
//     message: 'come in successfully!',
//     face: req.newFace
//   })
// })

//========template engine
app.engine('hbs', engine({//config file name from .handlebars to .hbs
    extname: '.hbs', //config file name from .handlebars to .hbs
    helpers: {
      sum: (a,b) => a + b,  //sum(a,b) {return a+b}
      sortable: (field, sort) => { //value truyền từ stored-courses.hbs: field: name/level, sort: _sort

        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'oi oi-elevator', //https://www.nsbasic.com/app/OpenIconic.html
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending'
        };

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a> `; // column=name: name is field in database         
      }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//console.log('dir: ',path.join(__dirname, 'resources/views'));
//========

//route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});