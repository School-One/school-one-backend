const { Router } = require('express');

const router = Router();

const { logoutUser } = require('../Controllers/LogoutUserController');

router.route('/')
    .post(logoutUser);

module.exports = router;