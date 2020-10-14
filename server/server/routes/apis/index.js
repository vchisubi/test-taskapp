'use strict';
const express = require('express');

const v1Controller = require('./v1');

let router = express.Router();

router.use('/', v1Controller);

module.exports = router;