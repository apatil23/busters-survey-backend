let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveyModel = mongoose.Schema({

    FirstName: String,
    LastName: String,
    Title: String,
        CreatedDate: Date,
    ExpiryDate: Date,
     Questions: Array


},
{
    collection: "surveydemo"
});


module.exports = mongoose.model('Survey',surveyModel);
