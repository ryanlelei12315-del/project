const express = require('express');
const { createPatient, getPatients } = require('../controllers/patientController');
const { validatePatient } = require('../middleware/validate');

const router = express.Router();

router.route('/')
    .post(validatePatient, createPatient)
    .get(getPatients);

module.exports = router;
