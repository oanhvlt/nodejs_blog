//1. import Model
const courseModel = require('../models/Course');
const {multipleMongooseToObj} = require('../../until/mongoose');

class SiteController {
    
    index(req, res, next){
        //======= C1: use callback func

        // courseModel.find({}, function(err, courses){
        //     if(!err) {
        //         res.json(courses);
        //         //return;
        //     }else{
        //         next(err);
        //         //res.status(400).json({error: 'ERROR!!'});
        //     }
        // });

        /*------or:---------*/

        // courseModel.find((error, courses) => {
        //     if(error){
        //         return res.status(500).json({
        //             message: `Internal server error: ${error.message}`
        //         })
        //     }
        //     else{
        //         console.log('Get all courses.')
        //         return res.status(200).json({
        //             message: `Load successful all courses!`,
        //             courses: courses
        //         })
        //     }
        // });

         //======= C2: use Promise
        // courseModel.find({})
        //             .then(courses => res.json(courses))
        //             .catch(next);

        courseModel.find({})
                    .then(courseF8Array => {
                        /*
                        //cách access model khi use handlebar
                        courseF8Array = courseF8Array.map(course => course.toObject()) //=> tách obj: function ra bằng cách dùng file until/mongoose.js
                        */

                        //GET /home : call home.hbs đã khai báo trong src/index
                        res.render('home', {
                            courses: multipleMongooseToObj(courseF8Array)//trả dữ liệu cho view: courses
                        }) 
                    })
                    .catch(next);
        
    }

    //[GET]  /search
    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController;