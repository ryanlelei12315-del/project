import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, ArrowRight, ShieldCheck, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(14,173,196,0.1)', color: 'var(--secondary)', padding: '8px 20px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '24px' }}>
            <ShieldCheck size={16} />
            <span>Trusted by 50,000+ Patients Worldwide</span>
          </div>
          
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.15', color: 'var(--primary)', marginBottom: '20px' }}>
            Exceptional Healthcare,<br />
            <span className="gradient-text">Delivered With Compassion</span>
          </h1>
          
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '32px', maxWidth: '520px' }}>
            Experience world-class medical care with our team of board-certified physicians. 
            From preventive wellness to advanced treatments — your health journey starts here.
          </p>
          
          <div className="hero-buttons" style={{ display: 'flex', gap: '16px' }}>
            <a href="#contact" className="btn btn-primary btn-lg">
              <CalendarCheck size={20} /> Book Appointment
            </a>
            <a href="#services" className="btn btn-outline btn-lg">
              Explore Services <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          <div className="hero-image-wrapper">
             {/* Note: In a real project we'd use the actual image path. 
                 Using a high-quality medical placeholder or the user's asset if it exists. */}
            <img 
              src="/assets/hero-doctor.png" 
              alt="Medical Professional" 
              className="hero-image" 
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', width: '100%' }}
            />
            
            {/* Floating Cards with Framer Motion */}
            <motion.div 
              className="floating-card card-appointment"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', bottom: '80px', left: '-40px', background: '#fff', padding: '14px 18px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <div style={{ background: 'rgba(14,173,196,0.1)', color: 'var(--secondary)', padding: '10px', borderRadius: '10px' }}>
                <CalendarCheck size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem' }}>Next Available</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Today, 2:30 PM</span>
              </div>
            </motion.div>

            <motion.div 
              className="floating-card card-rating"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              style={{ position: 'absolute', top: '60px', right: '-30px', background: '#fff', padding: '14px 18px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <div style={{ background: 'rgba(46,216,163,0.1)', color: 'var(--accent)', padding: '10px', borderRadius: '10px' }}>
                <Award size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem' }}>Top Rated</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>98% Satisfaction</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
