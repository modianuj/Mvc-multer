const express = require('express');
const apiController = require('../controllers/apiController');
const passport = require('passport')

const routes = express.Router();

routes.post('/', apiController.api);

routes.post('/loginData', apiController.loginData);
routes.get('/viewData' , passport.authenticate('jwt',{failureRedirect:false}),apiController.viewData)

module.exports = routes;
