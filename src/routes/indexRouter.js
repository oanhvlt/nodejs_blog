const newsRouter = require('./newsRouter');
const coursesRouter = require('./coursesRouter');
const siteRouter = require('./siteRouter');

function route(app){

    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
  

}

module.exports = route;