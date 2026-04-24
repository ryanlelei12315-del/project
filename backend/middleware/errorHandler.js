// Global error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // SQLite UNIQUE constraint violation
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(409).json({
            success: false,
            message: 'A record with that unique value already exists.'
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler;
