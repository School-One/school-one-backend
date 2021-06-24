const { Router } = require('express');

const router = Router();

const { registerUser } = require('../Controllers/RegisterController');

router.route('/')
    .post(registerUser);

module.exports = router;