const db = require('../config/db');

// @desc    Create new patient
// @route   POST /api/patients
const createPatient = (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        
        const stmt = db.prepare('INSERT INTO patients (name, email, phone) VALUES (?, ?, ?)');
        const info = stmt.run(name, email, phone || null);
        
        res.status(201).json({
            success: true,
            data: {
                id: info.lastInsertRowid,
                name,
                email,
                phone
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all patients
// @route   GET /api/patients
const getPatients = (req, res, next) => {
    try {
        const stmt = db.prepare('SELECT * FROM patients ORDER BY created_at DESC');
        const patients = stmt.all();
        
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPatient,
    getPatients
};
