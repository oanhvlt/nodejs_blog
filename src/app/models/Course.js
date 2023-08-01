const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema({
        name: { type: String, require: true },
        description: { type: String },
        image: { type: String, require: true },
        videoId: { type: String, require: true },
        level: { type: String},
        slug: { type: String, slug: 'name', unique: true }
    },
    {
        timestamps: true
    }
)

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt : true, 
    overrideMethods: 'all' 
});

//export
module.exports = mongoose.model('courses', Course);