const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Public Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// Logout Route
router.post('/logout', userController.logout);

module.exports = router;
