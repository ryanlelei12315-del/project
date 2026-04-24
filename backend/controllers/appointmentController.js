const db = require('../config/db');

// @desc    Book an appointment
// @route   POST /api/appointments
const createAppointment = (req, res, next) => {
    try {
        const { patient_id, name, email, phone, service, date, time } = req.body;
        
        let actualPatientId = patient_id;

        // If no patient_id is provided, try to find or create the patient
        if (!actualPatientId) {
            const findPatientStmt = db.prepare('SELECT id FROM patients WHERE email = ?');
            const existingPatient = findPatientStmt.get(email);

            if (existingPatient) {
                actualPatientId = existingPatient.id;
            } else {
                const insertPatientStmt = db.prepare('INSERT INTO patients (name, email, phone) VALUES (?, ?, ?)');
                const newPatient = insertPatientStmt.run(name, email, phone || null);
                actualPatientId = newPatient.lastInsertRowid;
            }
        }

        const stmt = db.prepare('INSERT INTO appointments (patient_id, service, date, time) VALUES (?, ?, ?, ?)');
        const info = stmt.run(actualPatientId, service, date, time);
        
        res.status(201).json({
            success: true,
            data: {
                id: info.lastInsertRowid,
                patient_id: actualPatientId,
                service,
                date,
                time,
                status: 'pending'
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all appointments
// @route   GET /api/appointments
const getAppointments = (req, res, next) => {
    try {
        const stmt = db.prepare(`
            SELECT a.*, p.name as patient_name, p.email as patient_email 
            FROM appointments a 
            LEFT JOIN patients p ON a.patient_id = p.id 
            ORDER BY a.date ASC, a.time ASC
        `);
        const appointments = stmt.all();
        
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
const updateAppointment = (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
        const info = stmt.run(status, id);

        if (info.changes === 0) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
const deleteAppointment = (req, res, next) => {
    try {
        const { id } = req.params;
        
        const stmt = db.prepare('DELETE FROM appointments WHERE id = ?');
        const info = stmt.run(id);

        if (info.changes === 0) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment
};
