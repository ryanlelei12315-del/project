import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="trust-stat">
      <div className="stat-number" style={{ fontSize: '2.8rem', fontWeight: '800', color: '#fff' }}>
        {count.toLocaleString()}
      </div>
      <div className="stat-label" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
        {label}
      </div>
    </div>
  );
};

const TrustBar = () => {
  const stats = [
    { value: 50000, label: 'Patients Treated' },
    { value: 150, label: 'Expert Physicians' },
    { value: 25, label: 'Years of Excellence' },
    { value: 98, label: 'Patient Satisfaction %' },
  ];

  return (
    <section className="trust-bar" style={{ background: 'var(--primary)', padding: '56px 0 48px' }}>
      <div className="container">
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          {stats.map((stat, i) => (
            <StatCounter key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
