const express = require('express');
const router = express.Router();
//const jwt = require('express-jwt');
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"]
});

// intialize authController with authentication class
const authController = require('../controllers/authentication');

// intialized tripsController with trips class
const tripsController = require('../controllers/trips');

// route login with authController
router
    .route('/login')
    .post(authController.login);

// route register with authController
router
    .route('/register')
    .post(authController.register);

// route trips listings wiht tripsController
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

// route trip codes with tripsController
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;