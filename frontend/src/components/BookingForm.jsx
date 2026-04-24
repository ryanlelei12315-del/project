import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Phone, Check, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const BookingForm = () => {
  const [services, setServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        if (res.data.success) setServices(res.data.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/appointments`, formData);
      if (res.data.success) {
        toast.success('Appointment booked successfully!');
        setFormData({ name: '', email: '', phone: '', service: '', date: '', time: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.errors?.[0] || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="cta-section" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #0a2e4a 100%)', position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
      <div className="container">
        <div className="cta-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>
              Your Health Can't Wait.<br />
              <span className="gradient-text-light">Neither Should You.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '40px' }}>
              Take the first step toward better health by scheduling a consultation with our experts.
            </p>

            <div className="booking-form-container">
              <form id="bookingForm" className="booking-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="+254 700 000 000" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Select Service</label>
                    <select id="service" name="service" required value={formData.service} onChange={handleChange}>
                      <option value="" disabled>Choose a specialty</option>
                      {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Preferred Time</label>
                    <input type="time" id="time" name="time" required value={formData.time} onChange={handleChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-white btn-lg btn-block" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <CalendarCheck size={20} />}
                  {isSubmitting ? 'Processing...' : 'Confirm Appointment'}
                </button>
              </form>
            </div>

            <div className="cta-reassurance" style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--accent)" /> No wait times
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--accent)" /> Insurance accepted
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={16} color="var(--accent)" /> Same-day appointments
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
