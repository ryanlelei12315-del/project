import React from 'react';
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer" style={{ background: 'var(--bg-dark)', padding: '72px 0 24px', color: 'rgba(255,255,255,0.7)' }}>
      <div className="container">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '48px', marginBottom: '48px' }}>
          <div className="footer-brand">
            <a href="#home" className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem', color: '#fff', marginBottom: '16px' }}>
              <div className="logo-icon" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--secondary), var(--accent))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HeartPulse size={18} />
              </div>
              <span>Multiverse<strong>Care</strong></span>
            </a>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              Delivering world-class healthcare with compassion, innovation, and an unwavering commitment to patient outcomes since 2001.
            </p>
            <div className="footer-social" style={{ display: 'flex', gap: '12px' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-col">
            <h4 style={{ color: '#fff', marginBottom: '20px' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#process">How It Works</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 style={{ color: '#fff', marginBottom: '20px' }}>Services</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>Cardiology</li>
              <li>Neurology</li>
              <li>Orthopedics</li>
              <li>Pediatrics</li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4 style={{ color: '#fff', marginBottom: '20px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem' }}>
                <MapPin size={18} color="var(--secondary)" />
                <span>123 Medical Plaza, Westlands<br />Nairobi, Kenya</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem' }}>
                <Phone size={18} color="var(--secondary)" />
                <span>+254 700 000 000</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem' }}>
                <Mail size={18} color="var(--secondary)" />
                <span>info@multiversecare.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <p>&copy; 2026 MultiverseCare Medical Group. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
