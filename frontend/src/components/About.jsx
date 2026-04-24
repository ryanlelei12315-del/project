import React from 'react';
import { motion } from 'framer-motion';
import { UserRound, Cpu, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: UserRound,
      title: 'Expert Medical Team',
      desc: '150+ board-certified physicians trained at world-renowned institutions with specialised fellowship training.'
    },
    {
      icon: Cpu,
      title: 'Advanced Technology',
      desc: 'Equipped with the latest diagnostic imaging, robotic surgery systems, and AI-assisted diagnostics.'
    },
    {
      icon: Clock,
      title: '24/7 Patient Care',
      desc: 'Round-the-clock emergency services and dedicated patient coordinators for seamless care continuity.'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
          
          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative' }}
          >
            <div className="about-image-wrapper">
              <img 
                src="/assets/about-hospital.png" 
                alt="Hospital Facility" 
                className="about-image" 
                style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
              />
              <div className="experience-badge" style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'linear-gradient(135deg, var(--secondary), var(--accent))', color: '#fff', padding: '20px 24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '2.2rem', fontWeight: '800', lineHeight: 1 }}>25+</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '500', opacity: 0.9 }}>Years of<br />Excellence</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">Why MultiverseCare</span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-1px', lineHeight: '1.2', marginBottom: '20px' }}>
              Where Medical Excellence Meets Genuine Compassion
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '32px' }}>
              We believe great healthcare starts with great relationships. Our patient-centred approach combines cutting-edge medicine with the warmth and attention you deserve.
            </p>
            
            <div className="about-features" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {features.map((f, i) => (
                <div key={i} className="feature-item" style={{ display: 'flex', gap: '16px' }}>
                  <div className="feature-icon" style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', background: 'rgba(14,173,196,0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                    <f.icon size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>{f.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
