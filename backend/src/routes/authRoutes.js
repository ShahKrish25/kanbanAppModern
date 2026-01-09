const express = require('express');
const {register, login} = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', register);

module.exports = router;