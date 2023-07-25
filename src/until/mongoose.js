
module.exports = {
    multipleMongooseToObj: function (courseF8Array){
        return courseF8Array.map(course => course.toObject());
    },
    mongooseToObj: function (course){
        return course ? course.toObject() : course;
    },
    
};