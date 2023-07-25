const courseModel = require('../models/Course');
const {mongooseToObj} = require('../../until/mongoose');

class CourseController {
    //[GET]  /courses/:slug
    show(req, res, next){
        //res.send(`<h2>Courses details ${req.params.slug}</h2>`); //follow by '/:slug' on coursesRouter.js
        
        /** Access model: use Promise **/
        //req.params.slug: follow by '/:slug' on coursesRouter.js
        courseModel.findOne({slug: req.params.slug}) //findOne({field in DB: value reference})
                    .then(courseF8 => {
                        //res.json(course)
                        res.render('courses/show', {
                            course: mongooseToObj(courseF8)//trả dữ liệu cho view: courses
                        }) 
                    })
                    .catch(next);
    }
}

module.exports = new CourseController;