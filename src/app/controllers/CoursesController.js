const CourseModel = require('../models/Course');
const {mongooseToObj} = require('../../until/mongoose');

class CourseController {
    //[GET]  /courses/:slug
    show(req, res, next){
        //res.send(`<h2>Courses details ${req.params.slug}</h2>`); //follow by '/:slug' on coursesRouter.js
        
        /** Access model: use Promise **/
        //req.params.slug: follow by '/:slug' on coursesRouter.js
        CourseModel.findOne({slug: req.params.slug}) //findOne({field in DB: value reference})
                    .then(courseF8 => {
                        //res.json(course)
                        res.render('courses/show', {
                            course: mongooseToObj(courseF8)//trả dữ liệu cho view: courses
                        }) 
                    })
                    .catch(next);
    }

    //[GET]  /courses/create
    create(req, res, next){
        res.render('courses/create');
    }
    //[GET]  /courses/:id/edit
    edit(req, res, next){
        CourseModel.findById(req.params.id)
            .then(courseF8 => {
                res.render('courses/edit', {
                    course: mongooseToObj(courseF8)
                })
            })
            .catch(next);
    }
    //[PUT]  /courses/:id
    update(req, res, next){
        //res.json(req.body);
        CourseModel.updateOne({_id: req.params.id}, req.body) //{condition}, object muốn update
                    .then(() => res.redirect('/me/stored/courses') )
                    .catch(next);
    }

    //[POST]  /courses/store
    store(req, res, next){
        //res.json(req.body);
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        const course = new CourseModel(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(err => {

            });
       
    }

    
}

module.exports = new CourseController();