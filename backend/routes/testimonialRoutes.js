const express = require('express');
const { getTestimonials, createTestimonial } = require('../controllers/testimonialController');
const { validateTestimonial } = require('../middleware/validate');

const router = express.Router();

router.route('/')
    .get(getTestimonials)
    .post(validateTestimonial, createTestimonial);

module.exports = router;
