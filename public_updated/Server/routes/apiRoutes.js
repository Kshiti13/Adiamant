// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController')

// User signup
router.get('/test', apiController.testAPI);

router.post('/generateEbook', apiController.generateEbook)
router.post('/getUserPdfs', apiController.getUserPdfs)
router.post('/getpdf', apiController.getpdf)
router.post('/payment', apiController.getSubscription)

// User login
// router.post('/login', userController.login);

module.exports = router;
