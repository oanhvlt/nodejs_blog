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

    //[POST]  /courses/store
    store(req, res, next){
        //res.json(req.body);
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        const course = new CourseModel(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => {

            });
       
    }

    //[PUT]  /courses/:id
    update(req, res, next){
        //res.json(req.body);
        CourseModel.updateOne({_id: req.params.id}, req.body) //{condition}, object muốn update
                    .then(() => res.redirect('/me/stored/courses') ) // redirect: thêm 1 key location vào Response header của HTTP trên browser
                    .catch(next);
    }

    //[PUT]  /courses/:id/softDelete
    softDelete(req, res, next){
        //CourseModel.deleteOne({_id: req.params.id}) //deleteOne({condition}, object muốn update)
        CourseModel.delete({_id: req.params.id}) //delete: use thư viện mongoose-delete đã add tại model Course.js
        .then(() => res.redirect('back') ) // redirect: thêm 1 key location vào Response header của HTTP trên browser
        .catch(next);
    }

     //[PATCH]  /courses/:id/restore
    restore(req, res, next){
        CourseModel.restore({_id: req.params.id}) //restore: use thư viện mongoose-delete đã add tại model Course.js
        .then(() => res.redirect('back') ) 
        .catch(next);
    }
    //[DELETE]  /courses/:id/restore/force
    forceDelete(req, res, next){
        CourseModel.deleteOne({_id: req.params.id}) //restore: use thư viện mongoose-delete đã add tại model Course.js
        .then(() => res.redirect('back') ) 
        .catch(next);
    }

    //[POST]  /courses/handle-form-actions
    handleFormActions(req, res, next){
        //res.json(req.body);
        switch(req.body.action){
            case 'delete':
                CourseModel.delete({_id: {$in: req.body.courseIds}}) //query 1 mảng by key '$in'
                .then(() => res.redirect('back') ) 
                .catch(next);
                break;
        
            default:
                res.json({message: 'Action is invalid!'});
        }
       
    }
}

module.exports = new CourseController();