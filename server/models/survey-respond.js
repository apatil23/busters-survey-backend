let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionAndAnswerSchema = new Schema({
    questions: {
        type: Array[Object]
    }
    // answer: {
    //     type: Boolean,
    //     required: true
    // }
});

module.exports = mongoose.model('Question and Answer',questionAndAnswerSchema);
