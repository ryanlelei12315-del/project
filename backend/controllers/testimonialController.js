const db = require('../config/db');

// @desc    Get all testimonials
// @route   GET /api/testimonials
const getTestimonials = (req, res, next) => {
    try {
        const stmt = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC');
        const testimonials = stmt.all();
        
        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add a new testimonial
// @route   POST /api/testimonials
const createTestimonial = (req, res, next) => {
    try {
        const { name, message, rating } = req.body;
        
        const stmt = db.prepare('INSERT INTO testimonials (name, message, rating) VALUES (?, ?, ?)');
        const info = stmt.run(name, message, rating || 5);
        
        res.status(201).json({
            success: true,
            data: {
                id: info.lastInsertRowid,
                name,
                message,
                rating: rating || 5
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTestimonials,
    createTestimonial
};
