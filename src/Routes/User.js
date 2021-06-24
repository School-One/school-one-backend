const { Router } = require('express');

const router = Router();

const { getUser, deleteUser, updateUser, getUsers } = require('../controllers/UserController')

router.route('/')
    .get(getUsers)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;