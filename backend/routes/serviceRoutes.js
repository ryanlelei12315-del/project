const express = require('express');
const { getServices } = require('../controllers/serviceController');

const router = express.Router();

router.route('/')
    .get(getServices);

module.exports = router;
