const db = require('../config/db');

// @desc    Get all services
// @route   GET /api/services
const getServices = (req, res, next) => {
    try {
        const stmt = db.prepare('SELECT * FROM services ORDER BY title ASC');
        const services = stmt.all();
        
        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getServices
};
