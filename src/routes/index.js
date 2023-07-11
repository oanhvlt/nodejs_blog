const newsRouter = require('./newsRouter');
const siteRouter = require('./siteRouter');

function route(app){

    app.use('/news', newsRouter);
    app.use('/', siteRouter);
  

}

module.exports = route;