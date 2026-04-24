import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Brain, Bone, Baby, Hand, Ribbon, Stethoscope, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const iconMap = {
  cardio: HeartPulse,
  neuro: Brain,
  ortho: Bone,
  pediat: Baby,
  derm: Hand,
  onco: Ribbon,
};

const getIcon = (title) => {
  const t = title.toLowerCase();
  for (const key in iconMap) {
    if (t.includes(key)) return iconMap[key];
  }
  return Stethoscope;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Specialties</span>
          <h2>Comprehensive Medical Services</h2>
          <p>From routine check-ups to complex procedures, we deliver personalised care across every medical discipline.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading services...</div>
        ) : (
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = getIcon(service.title);
              return (
                <motion.div 
                  key={service.id} 
                  className="service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="service-icon" style={{ width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '20px', background: 'linear-gradient(135deg, rgba(14,173,196,0.1), rgba(46,216,163,0.1))', color: 'var(--secondary)' }}>
                    <Icon size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: '1.6', marginBottom: '20px' }}>{service.description}</p>
                  <a href="#contact" className="service-link" style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Learn More <ArrowRight size={16} />
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
