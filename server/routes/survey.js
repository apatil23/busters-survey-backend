let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let surveyController = require('../controllers/survey');

//helper function for guarding
// function requireAuth(req, res, next)
// {
//     console.log(req)
//     // check if the user is logged in
//     if(!req.isAuthenticated())
//     {
//         return res.redirect('/login');
//     }
//     next();
// }

/* GET Route for the survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);

router.get('/:id', surveyController.getOneSurvey);

/* GET Route for the survey respond List page - READ Operation */
router.get('/survey-response/:id', surveyController.displaySurveyRespond);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add',  surveyController.processAddPage);

/* POST Route for processing the Survey answer Add page - CREATE Operation */
router.post('/survey-response-add/:id',  surveyController.processSurveyRespondAddPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', surveyController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.delete('/delete/:id', surveyController.performDelete);

module.exports = router;
