// Native input validation middleware to keep dependencies minimal

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePatient = (req, res, next) => {
    const { name, email } = req.body;
    const errors = [];

    if (!name || name.trim() === '') errors.push('Name is required');
    if (!email || email.trim() === '') errors.push('Email is required');
    else if (!validateEmail(email)) errors.push('Invalid email format');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
};

const validateAppointment = (req, res, next) => {
    const { patient_id, name, email, service, date, time } = req.body;
    const errors = [];

    // Allow either existing patient_id or new patient details (name + email)
    if (!patient_id && (!name || !email)) {
        errors.push('Either patient_id or both name and email are required');
    }
    if (email && !validateEmail(email)) {
        errors.push('Invalid email format');
    }
    if (!service || service.trim() === '') errors.push('Service is required');
    if (!date || date.trim() === '') errors.push('Date is required');
    if (!time || time.trim() === '') errors.push('Time is required');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
};

const validateContact = (req, res, next) => {
    const { name, email, message } = req.body;
    const errors = [];

    if (!name || name.trim() === '') errors.push('Name is required');
    if (!email || email.trim() === '') errors.push('Email is required');
    else if (!validateEmail(email)) errors.push('Invalid email format');
    if (!message || message.trim() === '') errors.push('Message is required');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
};

const validateTestimonial = (req, res, next) => {
    const { name, message, rating } = req.body;
    const errors = [];

    if (!name || name.trim() === '') errors.push('Name is required');
    if (!message || message.trim() === '') errors.push('Message is required');
    if (rating && (rating < 1 || rating > 5)) errors.push('Rating must be between 1 and 5');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }
    next();
};

module.exports = {
    validatePatient,
    validateAppointment,
    validateContact,
    validateTestimonial
};
