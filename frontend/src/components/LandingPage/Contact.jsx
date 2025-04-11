// ContactSection.jsx
import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({ submitted: true, error: null });

    // In a real implementation, you would send the data to your backend
    console.log("Form submitted:", formData);

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    }, 200);
  };

  return (
    <section id="contact" className="specify-contact-container">
      <div className="specify-contact-content">
        <div className="specify-contact-info">
          <h2 className="specify-contact-title">Get in touch</h2>
          <p className="specify-contact-description">
            Ready to streamline your learning experience? Reach out to us and
            we'll guide you through the journey.
          </p>

          <div className="specify-contact-methods">
            <div className="specify-contact-method">
              <div className="specify-contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
              </div>
              <div className="specify-contact-details">
                <h3 className="specify-contact-method-title">Call us</h3>
                <p className="specify-contact-method-value">+91 96733 56154</p>
              </div>
            </div>

            <div className="specify-contact-method">
              <div className="specify-contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="specify-contact-details">
                <h3 className="specify-contact-method-title">Email us</h3>
                <p className="specify-contact-method-value">
                  pvtumes@gmail.com
                </p>
              </div>
            </div>

            <div className="specify-contact-method">
              <div className="specify-contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="specify-contact-details">
                <h3 className="specify-contact-method-title">Visit us</h3>
                <p className="specify-contact-method-value">Pune, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="specify-contact-form-container">
          {formStatus.submitted ? (
            <div className="specify-contact-success">
              <div className="specify-success-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="specify-success-title">Message sent!</h3>
              <p className="specify-success-message">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <button
                className="specify-contact-button"
                onClick={() => setFormStatus({ submitted: false, error: null })}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="specify-contact-form" onSubmit={handleSubmit}>
              <h3 className="specify-form-title">Send us a message</h3>

              <div className="specify-form-row">
                <div className="specify-form-group">
                  <label htmlFor="specify-name" className="specify-form-label">
                    Your Name
                  </label>
                  <input
                    id="specify-name"
                    type="text"
                    name="name"
                    className="specify-form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="specify-form-group">
                  <label htmlFor="specify-email" className="specify-form-label">
                    Your Email
                  </label>
                  <input
                    id="specify-email"
                    type="email"
                    name="email"
                    className="specify-form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="specify-form-group">
                <label htmlFor="specify-company" className="specify-form-label">
                  Company Name
                </label>
                <input
                  id="specify-company"
                  type="text"
                  name="company"
                  className="specify-form-input"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="specify-form-group">
                <label htmlFor="specify-message" className="specify-form-label">
                  Your Message
                </label>
                <textarea
                  id="specify-message"
                  name="message"
                  className="specify-form-textarea"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="specify-contact-button">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
