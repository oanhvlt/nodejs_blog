//1. import Model
const courseModel = require('../models/Course');

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
                    .then(courseF8s => {
                        courseF8s = courseF8s.map(course => course.toObject())
                        res.render('home', {courses: courseF8s})
                    })
                    .catch(next);
        
        //GET /home
        //res.render('home'); //call home.hbs đã khai báo trong src/index
    }

    //[GET]  /search
    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController;