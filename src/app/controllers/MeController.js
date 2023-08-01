//1. import Model
const CourseModel = require('../models/Course');
const {multipleMongooseToObj} = require('../../until/mongoose');

class MeController {
    //[GET]  me/stored/courses
    storedCourses(req, res, next){
        CourseModel.find({})
            .then(courseArr => {
                res.render('me/stored-courses', { //'me/stored-courses': dir tới .hbs trong thư mục views
                    courses: multipleMongooseToObj(courseArr)
                })
            })
            .catch(next);
    }

    //[GET]  me/trash/courses
    trashCourses(req, res, next){
        //res.render('me/trash-courses');
        CourseModel.findWithDeleted({deleted: true})
            .then((courses) => {
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObj(courses)
                })
            })
            .catch(next);
        
    }
   
}

module.exports = new MeController();