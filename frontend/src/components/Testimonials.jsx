import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${API_URL}/testimonials`);
        if (res.data.success) {
          setTestimonials(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) return null;

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Patient Stories</span>
          <h2>What Our Patients Say</h2>
          <p>Real experiences from real people who trusted us with their health.</p>
        </div>

        <div className="testimonials-carousel" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
              style={{ width: '100%', margin: 0 }}
            >
              <div className="testimonial-stars" style={{ color: '#F5A623', display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < (testimonials[currentIndex]?.rating || 5) ? "#F5A623" : "none"} />
                ))}
              </div>
              <blockquote style={{ fontSize: '1.2rem', color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                "{testimonials[currentIndex]?.message}"
              </blockquote>
              <div className="testimonial-author" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="author-avatar" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                  {testimonials[currentIndex]?.name.charAt(0)}
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--primary)' }}>{testimonials[currentIndex]?.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Verified Patient</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls" style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="carousel-btn" onClick={prev} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft />
            </button>
            <button className="carousel-btn" onClick={next} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
