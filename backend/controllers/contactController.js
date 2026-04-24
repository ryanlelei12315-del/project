const db = require('../config/db');

// @desc    Submit a contact message
// @route   POST /api/contact
const createContact = (req, res, next) => {
    try {
        const { name, email, message } = req.body;
        
        const stmt = db.prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
        const info = stmt.run(name, email, message);
        
        res.status(201).json({
            success: true,
            data: {
                id: info.lastInsertRowid,
                name,
                email,
                message
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createContact
};
