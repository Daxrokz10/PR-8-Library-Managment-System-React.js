import { NavLink } from "react-router-dom";

function UserFooter() {
  return (
    <>
      <footer className="library-footer">
        <div className="footer-container">
          {/* Left Section */}
          <div className="footer-left">
            <div className="brand-container">
              <div className="brand-icon">📚</div>
              <div className="brand-content">
                <h4 className="brand-title">Digital Library Hub</h4>
                <p className="brand-description">
                  Manage books, members, and records efficiently with our modern
                  platform.
                </p>
              </div>
            </div>

            <div className="social-container">
              <div className="social-title">Follow Us</div>
              <div className="social-icons">
                <NavLink to="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f social-icon"></i>
                </NavLink>

                <NavLink to="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter social-icon"></i>
                </NavLink>

                <NavLink to="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram social-icon"></i>
                </NavLink>

                <NavLink to="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin social-icon"></i>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="footer-center">
            <div className="links-header">
              <h4 className="links-title">Quick Links</h4>
            </div>
            <ul className="links-list">
              <li className="link-item">
                <NavLink to="/" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">Home</span>
                </NavLink>
              </li>

              <li className="link-item">
                <NavLink to="#" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">About Us</span>
                </NavLink>
              </li>

              <li className="link-item">
                <NavLink to="#" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">Contact</span>
                </NavLink>
              </li>

              <li className="link-item">
                <NavLink to="#" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">My Books</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="footer-right">
            <div className="contact-header">
              <h4 className="contact-title">Contact Info</h4>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-type">Email</div>
                <NavLink
                  to="mailto:library@example.com"
                  className="contact-value"
                >
                  library@example.com
                </NavLink>
              </div>

              <div className="contact-item">
                <div className="contact-type">Phone</div>
                <NavLink to="tel:+919876543210" className="contact-value">
                  +91 98765 43210
                </NavLink>
              </div>

              <div className="contact-item">
                <div className="contact-type">Hours</div>
                <div className="contact-value">Mon–Fri: 9AM–6PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="bottom-container">
            <div className="copyright">
              © 2025 Digital Library Hub. All rights reserved.
            </div>
            <div className="extra-info">
              <span className="extra-item">Privacy Policy</span>
              <span className="extra-item">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
      <style>{`
        /* =====================
           FOOTER STYLES (No header interference)
        ===================== */
        .library-footer {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #e2e8f0;
          padding: 3rem 0 0;
          margin-top: auto;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }

        /* Ensure no interference with header */
        .library-footer * {
          box-sizing: border-box;
        }

        /* Main Container */
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Left Section - Brand */
        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .brand-container {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .brand-icon {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #ffffffff, #ffffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          flex-shrink: 0;
        }

        .brand-content {
          flex: 1;
        }

        .brand-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.75rem 0;
          color: #ffffff;
          line-height: 1.3;
        }

        .brand-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #94a3b8;
          margin: 0;
          max-width: 300px;
        }

        .social-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .social-icons {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: #cbd5e1;
          text-decoration: none;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
        }

        /* Center Section - Links */
        .footer-center {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .links-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .links-icon {
          font-size: 1.5rem;
          color: #6366f1;
        }

        .links-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
          color: #ffffff;
        }

        .links-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .link-item {
          display: flex;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border-radius: 6px;
          padding-left: 0.5rem;
        }

        .footer-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
          padding-left: 1rem;
        }

        .link-bullet {
          color: #6366f1;
          font-size: 1.2rem;
          line-height: 1;
        }

        .link-text {
          flex: 1;
        }

        /* Right Section - Contact */
        .footer-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .contact-icon {
          font-size: 1.5rem;
          color: #10b981;
        }

        .contact-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
          color: #ffffff;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-type {
          font-size: 0.85rem;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .contact-value {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 6px;
        }

        .contact-value:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(5px);
        }

        .value-icon {
          font-size: 1rem;
          color: #6366f1;
        }

        /* Footer Bottom */
        .footer-bottom {
          margin-top: 3rem;
          padding: 1.5rem 0;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .bottom-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .bottom-container {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        .copyright {
          font-size: 0.9rem;
          color: #94a3b8;
        }

        .extra-info {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .extra-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          font-size: 0.85rem;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .extra-item:hover {
          color: #ffffff;
        }

        .extra-icon {
          font-size: 0.9rem;
        }

        /* Animations */
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

        .footer-left,
        .footer-center,
        .footer-right {
          animation: fadeInUp 0.5s ease backwards;
        }

        .footer-left { animation-delay: 0.1s; }
        .footer-center { animation-delay: 0.2s; }
        .footer-right { animation-delay: 0.3s; }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          
          .footer-left {
            grid-column: span 2;
          }
        }

        @media (max-width: 576px) {
          .footer-container {
            padding: 0 1rem;
            gap: 2rem;
          }
          
          .brand-title {
            font-size: 1.3rem;
          }
          
          .brand-icon {
            font-size: 2rem;
          }
          
          .social-icons {
            justify-content: center;
          }
          
          .links-header,
          .contact-header {
            justify-content: center;
          }
          
          .extra-info {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </>
  );
}

export default UserFooter;
