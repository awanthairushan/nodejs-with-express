const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    code: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Subject', SubjectSchema);