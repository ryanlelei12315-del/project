import React from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Stethoscope, FlaskConical, HeartHandshake } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: CalendarPlus,
      title: 'Book Your Visit',
      desc: 'Schedule online or call us. Choose your preferred physician, specialty, and time slot that fits your life.'
    },
    {
      icon: Stethoscope,
      title: 'Expert Consultation',
      desc: 'Meet with your specialist for a thorough evaluation. We listen, examine, and craft a personalised care plan.'
    },
    {
      icon: FlaskConical,
      title: 'Diagnostics & Testing',
      desc: 'On-site labs and imaging deliver fast, accurate results — often within hours, not days.'
    },
    {
      icon: HeartHandshake,
      title: 'Treatment & Recovery',
      desc: 'Receive evidence-based treatment with continuous follow-up. We\'re with you every step to full recovery.'
    }
  ];

  return (
    <section id="process" className="process-section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2>Your Care Journey, Simplified</h2>
          <p>From your first call to full recovery, we make every step effortless.</p>
        </div>

        <div className="process-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className="process-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{ textAlign: 'center', position: 'relative' }}
            >
              <div className="step-number" style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '2px', marginBottom: '16px' }}>
                0{i + 1}
              </div>
              <div className="step-card" style={{ background: '#fff', padding: '36px 24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', height: '100%' }}>
                <div className="step-icon" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(14,173,196,0.1), rgba(46,216,163,0.1))', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 20px' }}>
                  <step.icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
