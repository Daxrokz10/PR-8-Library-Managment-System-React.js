import React from "react";
import UserHeader from "../UserHeader";
import UserFooter from "../UserFooter";

function ContactUs({ handleUserLogout }) {
  return (
    <>
      <UserHeader onLogout={handleUserLogout} />

      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-container">
          <div className="hero-background"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Get in Touch</h1>
              <p className="hero-subtitle">
                We're here to help with any questions about your library
                experience
              </p>
              <div className="hero-features">
                <div className="feature">
                  <span className="feature-text">24/7 Support</span>
                </div>
                <div className="feature">
                  <span className="feature-text">Quick Response</span>
                </div>
                <div className="feature">
                  <span className="feature-text">Live Chat Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-main-title">Contact Us</h2>
        </div>

        <div className="contact-grid">
          {/* Contact Information Card */}
          <div className="contact-info-card">
            <div className="card-header">
              <h3 className="card-title">Library Information</h3>
              <p className="card-subtitle">Visit us or get in touch</p>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <div className="detail-content">
                  <h4 className="detail-title">Address</h4>
                  <p className="detail-text">
                    Central Library, Main Street
                    <br />
                    City Center, India - 400001
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-content">
                  <h4 className="detail-title">Email</h4>
                  <p className="detail-text">
                    <a
                      href="mailto:librarysupport@example.com"
                      className="contact-link"
                    >
                      librarysupport@example.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-content">
                  <h4 className="detail-title">Phone</h4>
                  <p className="detail-text">
                    <a href="tel:+919876543210" className="contact-link">
                      +91 98765 43210
                    </a>
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-content">
                  <h4 className="detail-title">Working Hours</h4>
                  <p className="detail-text">
                    Monday – Saturday: 9:00 AM – 6:00 PM
                    <br />
                    Sunday: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card">
            <div className="form-header">
              <h3 className="form-title">Send us a Message</h3>
              <p className="form-subtitle">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <form className="contact-form">
              <div className="form-group">
                <label className="form-label">Full Name :</label>
                <div className="input-container">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address :</label>
                <div className="input-container">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject :</label>
                <div className="input-container">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Message :</label>
                <div className="textarea-container">
                  <textarea
                    className="form-textarea"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-footer">
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <UserFooter />
      <style>{`
        /* =====================
           GLOBAL STYLES
        ===================== */
        :root {
          --primary-color: #6366f1;
          --primary-light: #818cf8;
          --primary-dark: #4f46e5;
          --secondary-color: #f1f5f9;
          --accent-color: #8b5cf6;
          --text-color: #1e293b;
          --text-light: #64748b;
          --success-color: #10b981;
          --card-bg: #ffffff;
          --shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12);
          --radius: 16px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--text-color);
        }

        /* =====================
           HERO SECTION
        ===================== */
        .contact-hero {
          position: relative;
          margin: 2rem 2rem 4rem;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .hero-container {
          position: relative;
          height: 400px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          opacity: 0.9;
        }

        .hero-background::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f');
          background-size: cover;
          background-position: center;
          opacity: 0.2;
        }

        .hero-content {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 2rem;
          z-index: 2;
        }

        .hero-text {
          max-width: 800px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          transition: var(--transition);
        }

        .feature:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .feature-icon {
          font-size: 1.2rem;
        }

        .feature-text {
          font-size: 0.95rem;
          font-weight: 600;
        }

        /* =====================
           CONTAINER
        ===================== */
        .contact-container {
          max-width: 1400px;
          margin: 0 auto 4rem;
          padding: 0 2rem;
        }

        /* =====================
           CONTACT HEADER
        ===================== */
        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-main-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .title-icon {
          font-size: 2.2rem;
        }

        .contact-description {
          font-size: 1.2rem;
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* =====================
           CONTACT GRID
        ===================== */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        /* =====================
           CONTACT INFO CARD
        ===================== */
        .contact-info-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 2.5rem;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
        }

        .card-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .card-subtitle {
          color: var(--text-light);
          font-size: 1rem;
          margin: 0;
        }

        .contact-details {
          flex-grow: 1;
        }

        .detail-item {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
          transition: var(--transition);
        }

        .detail-item:hover {
          transform: translateX(5px);
        }

        .detail-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .detail-icon {
          font-size: 1.5rem;
          color: var(--primary-color);
          min-width: 40px;
          height: 40px;
          background: var(--secondary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .detail-content {
          flex: 1;
        }

        .detail-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .detail-text {
          color: var(--text-light);
          line-height: 1.6;
          margin: 0;
        }

        .contact-link {
          color: var(--primary-color);
          text-decoration: none;
          transition: var(--transition);
        }

        .contact-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .social-links {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .social-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          background: var(--secondary-color);
          border-radius: 50%;
          font-size: 1.2rem;
          text-decoration: none;
          color: var(--text-color);
          transition: var(--transition);
        }

        .social-icon:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-3px);
        }

        /* =====================
           CONTACT FORM CARD
        ===================== */
        .contact-form-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 2.5rem;
          box-shadow: var(--shadow);
        }

        .form-header {
          margin-bottom: 2.5rem;
        }

        .form-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .form-icon {
          font-size: 1.8rem;
        }

        .form-subtitle {
          color: var(--text-light);
          font-size: 1rem;
          margin: 0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 0;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-color);
        }

        .label-icon {
          font-size: 1rem;
        }

        .input-container,
        .textarea-container {
          position: relative;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.25rem 1rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          color: var(--text-color);
          background: var(--card-bg);
          transition: var(--transition);
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .input-icon,
        .textarea-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          color: var(--text-light);
          pointer-events: none;
        }

        .textarea-icon {
          top: 1.5rem;
          transform: none;
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
          padding-top: 1.5rem;
        }

        .form-footer {
          margin-top: 1rem;
        }

        .submit-btn {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: var(--transition);
          width: 100%;
          justify-content: center;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .form-note {
          text-align: center;
          color: var(--text-light);
          font-size: 0.85rem;
          margin-top: 1rem;
          margin-bottom: 0;
        }

        /* =====================
           MAP SECTION
        ===================== */
        .contact-map-section {
          margin-top: 4rem;
        }

        .map-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .map-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .map-icon {
          font-size: 1.8rem;
        }

        .map-description {
          color: var(--text-light);
          font-size: 1.1rem;
          margin: 0;
        }

        .map-placeholder {
          height: 300px;
          background: linear-gradient(135deg, var(--secondary-color), #ffffff);
          border-radius: var(--radius);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .map-placeholder::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          opacity: 0.3;
        }

        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(99, 102, 241, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }

        .map-overlay:hover {
          background: rgba(99, 102, 241, 0.2);
        }

        .map-content {
          text-align: center;
          color: var(--text-color);
        }

        .map-pin {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .map-content h4 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .map-content p {
          color: var(--text-light);
          margin: 0;
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 1200px) {
          .contact-container {
            padding: 0 1.5rem;
          }
          
          .hero-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 992px) {
          .contact-hero {
            margin: 1rem 1rem 3rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
          
          .hero-features {
            flex-direction: column;
            gap: 1rem;
          }
          
          .contact-grid {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero-container {
            height: 350px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .contact-main-title {
            font-size: 2rem;
          }
          
          .contact-info-card,
          .contact-form-card {
            padding: 2rem;
          }
          
          .detail-item {
            gap: 1rem;
          }
        }

        @media (max-width: 576px) {
          .contact-container {
            padding: 0 1rem;
          }
          
          .hero-container {
            height: 300px;
          }
          
          .hero-content {
            padding: 1rem;
          }
          
          .hero-title {
            font-size: 1.75rem;
          }
          
          .contact-main-title {
            font-size: 1.75rem;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .contact-info-card,
          .contact-form-card {
            padding: 1.5rem;
          }
          
          .card-title,
          .form-title {
            font-size: 1.5rem;
          }
          
          .form-input,
          .form-textarea {
            padding-left: 2.5rem;
          }
        }

        /* =====================
           ANIMATIONS
        ===================== */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-content {
          animation: fadeInUp 0.8s ease;
        }

        .contact-info-card,
        .contact-form-card {
          animation: fadeInUp 0.6s ease backwards;
        }

        .contact-info-card {
          animation-delay: 0.2s;
        }

        .contact-form-card {
          animation-delay: 0.4s;
        }

        /* =====================
           REDUCED MOTION
        ===================== */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default ContactUs;
