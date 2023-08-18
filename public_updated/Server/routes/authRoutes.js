// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User signup
router.post('/signup', userController.signup);

// User login
router.post('/login', userController.login);

module.exports = router;
