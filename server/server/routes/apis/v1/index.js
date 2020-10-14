'use strict';

const express = require('express');
const todolistController = require('../../../controllers/api/todos/index');
const authController = require('../../../controllers/auth/index');

let router = express.Router();

router.use('/api/todos', todolistController);
router.use('/auth', authController);

module.exports = router;