//1. import Model
const courseModel = require('../models/Course');

class SiteController {
    
    index(req, res){
        // courseModel.find({}, function(err, courses){
        //     if(!err) {
        //         res.json(courses);
        //         return;
        //     }
        //     res.status(400).json({error: 'ERROR!!'});
        // });

        courseModel.find((error, courses) => {
            if(error){
                return res.status(500).json({
                    message: `Internal server error: ${error.message}`
                })
            }
            else{
                console.log('Get all courses.')
                return res.status(200).json({
                    message: `Load successful all courses!`,
                    courses: courses
                })
            }
        });

        //GET /home
        //res.render('home');
    }

    //[GET]  /search
    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController;