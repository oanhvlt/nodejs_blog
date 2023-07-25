
class CourseController {
    //[GET]  /courses/:slug
    show(req, res){
        res.send('Courses details')
    }
}

module.exports = new CourseController;