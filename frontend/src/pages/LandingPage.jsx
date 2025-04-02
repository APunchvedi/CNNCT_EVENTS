import React from "react";
import "../styles/LandingPage.css";
import Logo from "../assets/Images/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../components/MainHeader";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainHeader
        signUpText={"Sign up free"}
        onSignUpClick={() => {
          navigate("/sign-up");
        }}
      />
      <div className="landing-container">
        <main className="main-content">
          <section className="hero-section">
            <h2 className="hero-title">CNNCT – Easy Scheduling Ahead</h2>
            <div className="hero-port">
              <Link to="/sign-up">
                <button className="port-button">Sign up free</button>
              </Link>
            </div>
          </section>

          <section className="intro-section">
            <h2 className="intro-title">
              Simplified scheduling for you and your team
            </h2>
            <p className="intro-text">
              CNNCT eliminates the back-and-forth of scheduling meetings so you
              can focus on what matters. Set your availability, share your link,
              and let others book time with you instantly.
            </p>
          </section>

          <section className="features-section">
            <article className="feature-content">
              <h3 className="feature-title">
                Stay Organized with Your Calendar &amp; Meetings
              </h3>
              <p className="feature-description">
                Seamless Event Scheduling View all your upcoming meetings and
                appointments in one place. Syncs with Google Calendar, Outlook,
                and iCloud to avoid conflicts. Customize event types:
                one-on-ones, team meetings, group sessions, and webinars.
              </p>
            </article>
            <div className="feature-images">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b4ae07897d803589db7093f001cda2dce4df6c4"
                alt="Calendar App"
                className="calendar-app-image"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ec27fd71e43f8d72a2c98ae745eb5c386191403"
                alt="Meeting Schedule"
                className="schedule-image"
              />
            </div>
          </section>

          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3772b68a04ac941576f81cd8dbc7eecc0ca5d583"
            alt="Dashboard"
            className="dashboard-image"
          />

          <section className="testimonials-section">
            <div className="testimonials-header">
              <h2 className="testimonials-title">
                Here's what our <span className="highlight">customer</span> has
                to says
              </h2>
              <div className="testimonials-subtitle">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.464 30C18.049 30 18.9856 28.8513 18.9856 27.1282C18.9856 24.1846 17.1844 22.6051 16.9683 16.7897C21.9395 19.8769 22.3718 22.1744 24.8934 23.682C25.5418 24.041 26.0461 24.1846 26.6225 24.1846C27.487 24.1846 28.2075 23.7538 28.7118 22.9641C28.928 22.6051 29 22.1744 29 21.7436C29 20.8821 28.4236 20.0205 27.415 19.4462C24.8213 18.0103 22.4438 18.7282 17.3285 16.0718C22.4438 13.2718 24.8213 13.9897 27.415 12.5538C28.4236 11.9077 29 11.118 29 10.1846C29 9.82564 28.928 9.39487 28.7118 8.9641C28.2075 8.17436 27.487 7.74359 26.6225 7.74359C26.0461 7.74359 25.5418 7.88718 24.8934 8.24615C22.3718 9.75384 21.9395 12.2667 16.9683 15.2821C17.1124 9.46667 18.9856 7.81539 18.9856 4.8C18.9856 3.07692 18.049 2 16.464 2C14.951 2 14.0144 3.07692 14.0144 4.8C14.0144 7.81539 16.0317 9.39487 16.1758 15.2821C11.0605 12.1949 10.6282 9.75384 8.03458 8.24615C7.45821 7.88718 6.95389 7.74359 6.37752 7.74359C5.51297 7.74359 4.79251 8.17436 4.28818 8.9641C4.07205 9.39487 4 9.82564 4 10.1846C4 11.118 4.57637 11.9077 5.58501 12.5538C8.17867 13.9897 10.4121 13.2718 15.6715 16.0718C10.5562 18.8 8.10663 18.0103 5.58501 19.4462C4.57637 20.0205 4 20.8821 4 21.7436C4 22.1744 4.07205 22.6051 4.28818 22.9641C4.79251 23.7538 5.51297 24.1846 6.37752 24.1846C6.95389 24.1846 7.45821 24.041 8.03458 23.682C10.6282 22.1744 11.0605 19.9487 16.1037 16.7897C15.8876 22.6769 14.0144 24.1128 14.0144 27.1282C14.0144 28.8513 14.951 30 16.464 30Z"
                    fill="#1877F2"
                  />
                </svg>
                <p className="testimonial-description">
                  {/* [short description goes in here] lorem ipsum is a placeholder
                  text to demonstrate. */}
                  Please check what our customers have to say about us!
                </p>
              </div>
              <button className="stories-btn">Read customer stories</button>
            </div>

            <div className="testimonials-grid">
              {/* Testimonial 1 */}
              <article className="testimonial-card gray">
                <div className="testimonial-content">
                  <h3 className="testimonial-card-title">
                    Amazing tool! Saved me months
                  </h3>
                  <p className="testimonial-card-text">
                    This is a placeholder for your testimonials and what your
                    client has to say, put them here and make sure its 100% true
                    and meaningful.
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar" />
                  <div>
                    <h4 className="author-name">John Master</h4>
                    <p className="author-title">Director, Spark.com</p>
                  </div>
                </div>
              </article>

              {/* Testimonial 2 */}
              <article className="testimonial-card white">
                <div className="testimonial-content">
                  <h3 className="testimonial-card-title">
                    Amazing tool! Saved me months
                  </h3>
                  <p className="testimonial-card-text">
                    This is a placeholder for your testimonials and what your
                    client has to say, put them here and make sure its 100% true
                    and meaningful.
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar" />
                  <div>
                    <h4 className="author-name">John Master</h4>
                    <p className="author-title">Director, Spark.com</p>
                  </div>
                </div>
              </article>

              {/* Testimonial 3 */}
              <article className="testimonial-card white">
                <div className="testimonial-content">
                  <h3 className="testimonial-card-title">
                    Amazing tool! Saved me months
                  </h3>
                  <p className="testimonial-card-text">
                    This is a placeholder for your testimonials and what your
                    client has to say, put them here and make sure its 100% true
                    and meaningful.
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar" />
                  <div>
                    <h4 className="author-name">John Master</h4>
                    <p className="author-title">Director, Spark.com</p>
                  </div>
                </div>
              </article>

              {/* Testimonial 4 */}
              <article className="testimonial-card gray">
                <div className="testimonial-content">
                  <h3 className="testimonial-card-title">
                    Amazing tool! Saved me months
                  </h3>
                  <p className="testimonial-card-text">
                    This is a placeholder for your testimonials and what your
                    client has to say, put them here and make sure its 100% true
                    and meaningful.
                  </p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar" />
                  <div>
                    <h4 className="author-name">John Master</h4>
                    <p className="author-title">Director, Spark.com</p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <h2 className="integrations-title">All Link Apps and Integrations</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9bb3ad5d0b8da9317dd07f7e153fe83eeb29172"
            alt="Integrations"
            className="integrations-image"
          />

          <footer className="main-footer">
            <div className="footer-content">
              <div className="footer-buttons">
                <Link to="/sign-in">
                  <button className="login-btn">Log in</button>
                </Link>
                <Link to="/sign-up">
                  <button className="signup-btn">Sign up free</button>
                </Link>
              </div>

              <div className="footer-links">
                <nav className="footer-nav">
                  <h3>About CNNCT</h3>
                  <a href="#">Blog</a>
                  <a href="#">Press</a>
                  <a href="#">Social Good</a>
                  <a href="#">Contact</a>
                </nav>

                <nav className="footer-nav">
                  <h3>Careers</h3>
                  <a href="#">Getting Started</a>
                  <a href="#">Features and How-Tos</a>
                  <a href="#">FAQs</a>
                  <a href="#">Report a Violation</a>
                </nav>

                <nav className="footer-nav">
                  <h3>Legal</h3>
                  <a href="#">Terms and Conditions</a>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Cookie Notice</a>
                  <a href="#">Trust Center</a>
                </nav>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-acknowledgment">
                We acknowledge the Traditional Custodians of the land on which
                our office stands, The Wurundjeri people of the Kulin Nation,
                and pay our respects to Elders past, present and emerging.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 36 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 5.36805C29.1174 5.76905 28.1693 6.03999 27.1726 6.16246C28.1894 5.5382 28.9694 4.54763 29.3373 3.36848C28.386 3.94722 27.3322 4.36773 26.2107 4.59315C25.3123 3.61342 24.0333 3 22.6169 3C19.8984 3 17.6935 5.26076 17.6935 8.0504C17.6935 8.44489 17.7379 8.82855 17.8203 9.1992C13.7266 8.98786 10.1001 6.97746 7.6711 3.92338C7.2483 4.67118 7.0052 5.5382 7.0052 6.46158C7.0052 8.21296 7.8751 9.75951 9.19528 10.6645C8.38774 10.6374 7.62882 10.4109 6.96503 10.0326V10.0976C6.96503 12.5437 8.6615 14.5845 10.915 15.0483C10.5007 15.1632 10.0662 15.2239 9.61807 15.2239C9.30098 15.2239 8.99128 15.1936 8.69109 15.135C9.31789 17.14 11.1359 18.601 13.2911 18.64C11.6052 19.9947 9.48172 20.8021 7.17537 20.8021C6.77794 20.8021 6.3858 20.7783 6 20.7317C8.17951 22.1655 10.767 23 13.5469 23C22.6053 23 27.5573 15.3074 27.5573 8.63563C27.5573 8.41888 27.552 8.19996 27.5425 7.9832C28.5044 7.27008 29.3394 6.38246 29.9979 5.3713L30 5.36805Z"
                      fill="#1E2330"
                    />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 36 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.9998 1.53735C14.8864 1.53735 14.4966 1.55009 13.274 1.60613C12.0538 1.66217 11.2202 1.85576 10.4911 2.13914C9.72628 2.42694 9.03346 2.8781 8.46092 3.46117C7.87797 4.03379 7.42683 4.72659 7.1389 5.49133C6.85552 6.22048 6.66129 7.05407 6.60589 8.27484C6.55048 9.49689 6.53711 9.88598 6.53711 13C6.53711 16.114 6.54985 16.5031 6.60589 17.7258C6.66192 18.9459 6.85552 19.7795 7.1389 20.5087C7.4267 21.2735 7.87786 21.9663 8.46092 22.5388C9.09774 23.1756 9.73774 23.5679 10.4911 23.8609C11.2202 24.1442 12.0538 24.3385 13.274 24.3939C14.4966 24.4493 14.8864 24.4626 17.9998 24.4626C21.1131 24.4626 21.5029 24.4499 22.7255 24.3939C23.9457 24.3378 24.7793 24.1442 25.5084 23.8609C26.2732 23.573 26.966 23.1219 27.5386 22.5388C28.1754 21.902 28.5677 21.262 28.8606 20.5087C29.144 19.7795 29.3382 18.9459 29.3936 17.7258C29.449 16.5031 29.4624 16.1134 29.4624 13C29.4624 9.88662 29.4497 9.49689 29.3936 8.27421C29.3376 7.05407 29.144 6.22048 28.8606 5.49133C28.5728 4.72653 28.1216 4.03371 27.5386 3.46117C26.966 2.87822 26.2732 2.42707 25.5084 2.13914C24.7793 1.85576 23.9457 1.66153 22.7249 1.60613C21.5029 1.55073 21.1138 1.53735 17.9998 1.53735ZM17.9992 16.8258C17.497 16.8258 16.9996 16.7269 16.5356 16.5347C16.0715 16.3425 15.6499 16.0607 15.2947 15.7056C14.9396 15.3504 14.6579 14.9288 14.4657 14.4648C14.2734 14.0007 14.1745 13.5034 14.1745 13.0011C14.1745 12.4988 14.2734 12.0015 14.4657 11.5375C14.6579 11.0734 14.9396 10.6518 15.2947 10.2966C15.6499 9.94149 16.0715 9.65976 16.5356 9.46755C16.9996 9.27534 17.497 9.17641 17.9992 9.17641C19.0136 9.17641 19.9864 9.57937 20.7037 10.2966C21.421 11.0139 21.8239 11.9867 21.8239 13.0011C21.8239 14.0155 21.421 14.9883 20.7037 15.7056C19.9864 16.4229 19.0136 16.8258 17.9992 16.8258ZM17.9992 7.10932C16.4366 7.10932 14.938 7.73006 13.8331 8.83498C12.7282 9.93991 12.1074 11.4385 12.1074 13.0011C12.1074 14.5637 12.7282 16.0623 13.8331 17.1672C14.938 18.2722 16.4366 18.8929 17.9992 18.8929C19.5618 18.8929 21.0604 18.2722 22.1654 17.1672C23.2703 16.0623 23.891 14.5637 23.891 13.0011C23.891 11.4385 23.2703 9.93991 22.1654 8.83498C21.0604 7.73006 19.5618 7.10932 17.9992 7.10932ZM25.6053 7.00233C25.6053 7.3717 25.4586 7.72594 25.1974 7.98713C24.9362 8.24831 24.582 8.39504 24.2126 8.39504C23.8432 8.39504 23.489 8.24831 23.2278 7.98713C22.9666 7.72594 22.8199 7.3717 22.8199 7.00233C22.8199 6.63296 22.9666 6.27872 23.2278 6.01753C23.489 5.75635 23.8432 5.60962 24.2126 5.60962C24.582 5.60962 24.9362 5.75635 25.1974 6.01753C25.4586 6.27872 25.6053 6.63296 25.6053 7.00233Z"
                      fill="#1E2330"
                    />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 36 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M29.1639 3.59545C30.3957 3.92727 31.3639 4.89545 31.6911 6.12273C32.2866 8.35 32.2866 13 32.2866 13C32.2866 13 32.2866 17.65 31.6911 19.8773C31.3593 21.1091 30.3911 22.0773 29.1639 22.4045C26.9366 23 18.0002 23 18.0002 23C18.0002 23 9.06841 23 6.83659 22.4045C5.60478 22.0727 4.63659 21.1045 4.30932 19.8773C3.71387 17.65 3.71387 13 3.71387 13C3.71387 13 3.71387 8.35 4.30932 6.12273C4.64114 4.89091 5.60932 3.92273 6.83659 3.59545C9.06841 3 18.0002 3 18.0002 3C18.0002 3 26.9366 3 29.1639 3.59545ZM22.5663 12.9993L15.1436 17.2856V8.71289L22.5663 12.9993Z"
                      fill="#1E2330"
                    />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 36 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.5509 4.20342C23.6117 3.12665 23.047 1.72263 23.047 0.187744H21.8701C22.1732 1.86542 23.1719 3.30514 24.5509 4.20342Z"
                      fill="#1E2330"
                    />
                    <path
                      d="M13.6572 12.878C11.6184 12.878 9.95996 14.5378 9.95996 16.5784C9.95996 18.0003 10.7684 19.2377 11.9453 19.8564C11.5054 19.2496 11.2439 18.506 11.2439 17.6968C11.2439 15.6563 12.9023 13.9964 14.9412 13.9964C15.3216 13.9964 15.6901 14.0618 16.0349 14.169V9.67142C15.6782 9.62377 15.3157 9.59399 14.9412 9.59399C14.8758 9.59399 14.8164 9.59995 14.751 9.59995V13.0505C14.4003 12.9434 14.0377 12.878 13.6572 12.878Z"
                      fill="#1E2330"
                    />
                    <path
                      d="M27.8815 6.17993V9.6007C25.5989 9.6007 23.4828 8.869 21.759 7.63153V16.5851C21.759 21.0529 18.1271 24.6939 13.6571 24.6939C11.9332 24.6939 10.3283 24.1465 9.01465 23.2244C10.4947 24.8128 12.6049 25.8123 14.941 25.8123C19.4051 25.8123 23.0429 22.1773 23.0429 17.7035V8.74998C24.7667 9.98745 26.8828 10.7192 29.1654 10.7192V6.31682C28.7196 6.31682 28.2916 6.26917 27.8815 6.17993Z"
                      fill="#1E2330"
                    />
                    <path
                      d="M21.7548 16.5837V7.63015C23.4787 8.86762 25.5948 9.59932 27.8774 9.59932V6.17855C26.5578 5.89901 25.3987 5.18508 24.5427 4.20342C23.1636 3.30514 22.171 1.86542 21.8559 0.187744H18.6342L18.6282 17.839C18.5569 19.8141 16.9282 21.4026 14.9369 21.4026C13.7005 21.4026 12.6127 20.7898 11.9351 19.8617C10.7581 19.237 9.94971 18.0056 9.94971 16.5837C9.94971 14.5432 11.6081 12.8833 13.647 12.8833C14.0274 12.8833 14.396 12.9487 14.7407 13.0558V9.60528C10.3658 9.70048 6.83496 13.2938 6.83496 17.7022C6.83496 19.832 7.6612 21.7714 9.01053 23.223C10.3242 24.1451 11.9291 24.6925 13.6529 24.6925C18.117 24.6925 21.7548 21.0516 21.7548 16.5837Z"
                      fill="#1E2330"
                    />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.6916 26.0563C27.3412 25.6435 28.5716 25.2323 28.5716 25.2323C28.9503 25.0389 29.2672 24.7431 29.4861 24.3785C29.7051 24.0139 29.8173 23.5951 29.81 23.1699V20.6947C29.1748 22.9436 27.7006 24.8628 25.6916 26.0563Z"
                      fill="#1E2330"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default LandingPage;
