import React, { useState, useEffect } from 'react';
import { Menu, X, HeartPulse, CalendarCheck } from 'lucide-react';
import '../App.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'How It Works', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
        <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.35rem', color: 'var(--primary)', fontWeight: '500' }}>
          <div className="logo-icon" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--secondary), var(--accent))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#fff' }}>
            <HeartPulse size={22} />
          </div>
          <span>Multiverse<strong>Care</strong></span>
        </a>

        {/* Desktop Nav */}
        <ul className="nav-links" style={{ display: 'flex', gap: '8px' }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="nav-link" style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)', fontWeight: '500', transition: 'var(--transition)' }}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions" style={{ display: 'flex', gap: '16px' }}>
          <a href="#contact" className="btn btn-nav-cta" style={{ background: 'var(--secondary)', color: '#fff', padding: '10px 24px', fontSize: '0.9rem' }}>
            <CalendarCheck size={18} /> Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="nav-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ display: 'none', background: 'none', border: 'none' }}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', padding: '24px', boxShadow: 'var(--shadow-lg)' }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: '500' }}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
