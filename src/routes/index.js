function route(app){
    
    //Action ==> Dispatcher ==> func handler (controller)
    app.get('/', (req, res) => {
        res.render('home');  //'home': view
    });
    
    app.get('/news', (req, res) => {
      res.render('news');
    });
    
    app.get('/search', (req, res) => {
        console.log(req.query.q);
        res.render('search');
    });
    
    app.post('/search', (req, res) => {
        console.log(req.body);
        res.send('');
    });
  

}

module.exports = route;