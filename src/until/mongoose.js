
module.exports = {
    multipleMongooseToObj: function (courseF8Array){
        return courseF8Array.map(course => course.toObject());
    },
    mongooseToObj: function (courseF8){
        return courseF8 ? courseF8.toObject() : courseF8;
    },
    
};