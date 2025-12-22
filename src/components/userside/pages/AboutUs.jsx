import React from "react";
import UserHeader from "../UserHeader";
import UserFooter from "../UserFooter";

function AboutUs({ handleUserLogout }) {
  return (
    <>
      <UserHeader onLogout={handleUserLogout} />

      <div className="about-us-container">
        {/* Hero Banner */}
        <div className="about-hero">
          <div className="hero-image-container">
            <img
              src="https://www.backdropsource.com/cdn/shop/products/25BookshelfBackground.jpg?v=1591710886&utm_source=chatgpt.com"
              alt="Library bookshelf"
              className="hero-image"
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="hero-text-wrapper">
                <h1 className="hero-title">About Our Digital Library</h1>
                <p className="hero-subtitle">
                  Revolutionizing the way you discover and manage books
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">5000+</span>
                    <span className="stat-label">Digital Books</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Access</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Free Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="about-content-wrapper">
          <div className="about-main-content">
            <div className="content-header">
              <h2 className="content-title">Our Mission & Vision</h2>
              <p className="content-intro">
                Empowering readers with seamless access to knowledge through
                innovative digital solutions
              </p>
            </div>

            <div className="about-grid">
              <div className="about-card">
                <h3 className="card-title">Our Mission</h3>
                <p className="card-text">
                  To create an intuitive digital ecosystem that simplifies
                  library management while enhancing the reading experience for
                  every user. We aim to bridge the gap between traditional
                  libraries and modern technology.
                </p>
              </div>

              <div className="about-card">
                <h3 className="card-title">Our Vision</h3>
                <p className="card-text">
                  To become the leading digital library platform that transforms
                  how people access, manage, and share knowledge globally. We
                  envision a world where everyone has equal access to
                  information and literature.
                </p>
              </div>

              <div className="about-card">
                <h3 className="card-title">Innovation</h3>
                <p className="card-text">
                  Leveraging cutting-edge technology to create smart features
                  like personalized recommendations, real-time availability
                  tracking, and seamless borrowing processes that adapt to
                  modern reading habits.
                </p>
              </div>
            </div>

            <div className="about-details">
              <div className="details-section">
                <h3 className="details-title">About the Platform</h3>
                <p className="details-text">
                  Our Library Management System is designed to simplify and
                  modernize the way libraries manage books, members, and daily
                  operations. The platform provides an efficient and
                  user-friendly interface that allows users to explore available
                  books, check categories, and borrow books with ease. At the
                  same time, administrators can manage book inventory, track
                  borrowed and available books, and organize library data in a
                  structured manner.
                </p>
              </div>

              <div className="details-section">
                <h3 className="details-title">Our Impact</h3>
                <p className="details-text">
                  This system aims to reduce manual work, improve accuracy, and
                  save time by automating common library tasks. By offering
                  features such as category-based browsing, real-time stock
                  updates, and secure user access, the Library Management System
                  ensures a smooth experience for both users and administrators.
                  Our goal is to create a reliable digital solution that makes
                  library management more accessible, organized, and efficient
                  for everyone.
                </p>
              </div>
            </div>
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
           CONTAINER
        ===================== */
        .about-us-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* =====================
           HERO SECTION
        ===================== */
        .about-hero {
          position: relative;
          margin: 2rem 0 4rem;
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .hero-image-container {
          position: relative;
          height: 500px;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.8);
          transition: transform 0.5s ease;
        }

        .about-hero:hover .hero-image {
          transform: scale(1.02);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.9) 0%, 
            rgba(139, 92, 246, 0.8) 100%);
        }

        .hero-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          z-index: 2;
          padding: 2rem;
        }

        .hero-text-wrapper {
          max-width: 800px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          opacity: 0.9;
          margin-bottom: 3rem;
          font-weight: 500;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-top: 3rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* =====================
           MAIN CONTENT
        ===================== */
        .about-content-wrapper {
          margin-bottom: 4rem;
        }

        .about-main-content {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 3rem;
          box-shadow: var(--shadow);
        }

        .content-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .content-title {
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

        .content-intro {
          font-size: 1.2rem;
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* =====================
           ABOUT GRID
        ===================== */
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .about-card {
          background: linear-gradient(135deg, var(--secondary-color), #ffffff);
          border-radius: var(--radius);
          padding: 2.5rem;
          text-align: center;
          transition: var(--transition);
          border: 1px solid #e2e8f0;
        }

        .about-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
          border-color: var(--primary-light);
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .card-text {
          color: var(--text-light);
          line-height: 1.7;
          margin: 0;
        }

        /* =====================
           DETAILS SECTION
        ===================== */
        .about-details {
          margin: 4rem 0;
        }

        .details-section {
          margin-bottom: 3rem;
        }

        .details-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-color);
          position: relative;
          padding-bottom: 1rem;
        }

        .details-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          border-radius: 2px;
        }

        .details-text {
          color: var(--text-light);
          line-height: 1.8;
          font-size: 1.1rem;
          margin: 0;
        }

        /* =====================
           FEATURES GRID
        ===================== */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-item {
          text-align: center;
          padding: 2rem;
          background: var(--secondary-color);
          border-radius: 12px;
          transition: var(--transition);
        }

        .feature-item:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .feature-text {
          color: var(--text-light);
          font-size: 0.95rem;
          margin: 0;
        }

        /* =====================
           CALL TO ACTION
        ===================== */
        .about-cta {
          text-align: center;
          padding: 3rem;
          background: linear-gradient(135deg, var(--secondary-color), #ffffff);
          border-radius: var(--radius);
          margin-top: 4rem;
          border: 2px dashed var(--primary-light);
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .cta-text {
          color: var(--text-light);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn-cta {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: var(--transition);
        }

        .btn-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);
        }

        .cta-icon {
          font-size: 1.2rem;
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 1200px) {
          .about-us-container {
            padding: 0 1.5rem;
          }
          
          .hero-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 992px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
          
          .hero-stats {
            gap: 2rem;
          }
          
          .about-main-content {
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            margin: 1rem 0 3rem;
          }
          
          .hero-image-container {
            height: 400px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .content-title {
            font-size: 2rem;
          }
          
          .about-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .about-us-container {
            padding: 0 1rem;
          }
          
          .hero-image-container {
            height: 350px;
          }
          
          .hero-content {
            padding: 1rem;
          }
          
          .hero-title {
            font-size: 1.75rem;
          }
          
          .about-main-content {
            padding: 1.5rem;
          }
          
          .content-title {
            font-size: 1.75rem;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .about-card {
            padding: 1.5rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .feature-item {
            padding: 1.5rem;
          }
          
          .about-cta {
            padding: 2rem 1rem;
          }
          
          .cta-title {
            font-size: 1.5rem;
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

        .about-card {
          animation: fadeInUp 0.6s ease backwards;
        }

        .about-card:nth-child(1) { animation-delay: 0.2s; }
        .about-card:nth-child(2) { animation-delay: 0.4s; }
        .about-card:nth-child(3) { animation-delay: 0.6s; }

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

export default AboutUs;
