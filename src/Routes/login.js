const { Router } = require('express');

const router = Router();

const { loginUser } = require('../Controllers/LoginController');

router.route('/')
    .post(loginUser);

module.exports = router;