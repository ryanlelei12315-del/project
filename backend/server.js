const express = require('express');
const cors = require('cors');

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

// Import global error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json()); // Parse JSON payloads

// Mount routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Root route for API testing
app.get('/', (req, res) => {
    res.send('MultiverseCare API is running...');
});

// Handle undefined routes (404)
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Global Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
