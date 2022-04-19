//Modules for user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        name:
            {
                type: String,
                default: '',
                trim: true,
                required: 'username needed'
            },
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required: 'username required'
        },

        email:
            {
                type: String,
                default: '',
                trim: true,
                required: 'email needed'
            },
        password:
            {
                type: String,
                default: '',
                trim: true,
                required: 'password needed'
           }
           // created:
           // {
           //  type: Date,
           //  default: Date.now
           //
           // },
           // updated:
           // {
           //  type: Date,
           //  default: Date.now
           // }
            
    },    
    {
        collection: "users"
    }
);

//configure options for user model
let options = ({missingPasswordError: 'wrong/missing password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);

