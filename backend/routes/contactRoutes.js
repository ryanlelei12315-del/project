const express = require('express');
const { createContact } = require('../controllers/contactController');
const { validateContact } = require('../middleware/validate');

const router = express.Router();

router.route('/')
    .post(validateContact, createContact);

module.exports = router;
