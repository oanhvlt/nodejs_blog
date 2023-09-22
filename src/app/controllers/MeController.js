//1. import Model
const CourseModel = require('../models/Course');
const {multipleMongooseToObj} = require('../../until/mongoose');

class MeController {
    //[GET]  me/stored/courses
    storedCourses(req, res, next){

        //res.json(res.locals._sort);

        let courseQuery = CourseModel.find({});

        //hasOwnProperty: check param exist in query
        if(req.query.hasOwnProperty('_sort')){
           courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
           });
        }

        //Promise
        Promise.all([courseQuery, CourseModel.countDocumentsWithDeleted({deleted: true})])
            .then(([courseArr, deletedCount]) =>  // [courseArr, deletedCount] : destructuring
                res.render('me/stored-courses', { //'me/stored-courses': dir tới .hbs trong thư mục views, truyền vào 2 value: courses, deletedCount 
                    courses: multipleMongooseToObj(courseArr),
                    deletedCount  //  ~ deletedCount: deletedCount (object literal)
                })
            )
            .catch(next);

        //đếm số course trong thùng rác
        // CourseModel.countDocumentsWithDeleted({deleted: true})
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // CourseModel.find({})
        //     .then(courseArr => {
        //         res.render('me/stored-courses', { //'me/stored-courses': dir tới .hbs trong thư mục views
        //             courses: multipleMongooseToObj(courseArr)
        //         })
        //     })
        //     .catch(next);

        
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