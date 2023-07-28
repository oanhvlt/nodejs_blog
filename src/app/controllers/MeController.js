//1. import Model
const CourseModel = require('../models/Course');
const {multipleMongooseToObj} = require('../../until/mongoose');

class MeController {
    //[GET]  me/stored/courses
    storedCourses(req, res, next){
        CourseModel.find({})
            .then(courseArr => {
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObj(courseArr)
                })
            })
            .catch(next);
    }
}

module.exports = new MeController();