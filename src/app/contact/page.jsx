'use client';

import { useState } from 'react';
import styles from './contact.module.css';
import Footer from '@/components/layout/Footer/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ fullName: '', email: '', message: '' });
  }

  return (
    <main className={styles.main}>
      {/* All contact content in a wrapper */}
      <div className={styles.content}>
        {/* Decorative dot grid - top right */}
        <div className={styles.dotGrid}></div>

        {/* Contact Card */}
        <section className={styles.section}>
          <div className={styles.card}>
            <h1 className={styles.heading}>CONTACT US</h1>

            <div className={styles.cardBody}>
              {/* Left - Form */}
              <div className={styles.formSide}>
                {submitted ? (
                  <div className={styles.successMessage}>
                    <p>Thank you! Your message has been sent.</p>
                    <button
                      className={styles.sendBtn}
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                  >
                    <input
                      type='text'
                      name='fullName'
                      placeholder='Full Name'
                      value={formData.fullName}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    />
                    <input
                      type='email'
                      name='email'
                      placeholder='Email Address'
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    />
                    <textarea
                      name='message'
                      placeholder='Your Message'
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.textarea}
                      rows={6}
                      required
                    />
                    <button
                      type='submit'
                      className={styles.sendBtn}
                    >
                      Send
                    </button>
                  </form>
                )}
              </div>

              {/* Right - Contact Info + Map */}
              <div className={styles.infoSide}>
                <div className={styles.contactInfo}>
                  <p className={styles.companyName}>TalentFlow</p>
                  <p className={styles.infoText}>
                    1234 Maplewood Drive Springfield, IL 62704, United State
                  </p>
                  <p className={styles.infoText}>+1 (555) 123-4567</p>
                  <p className={styles.infoText}>hello@talentflow.com</p>
                </div>

                {/* Map */}
                <div className={styles.mapContainer}>
                  <iframe
                    title='TalentFlow Location'
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.123456789!2d-89.6501!3d39.7817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzU0LjEiTiA4OcKwMzknMDAuNCJX!5e0!3m2!1sen!2sus!4v1234567890'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen=''
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative geometric squares - bottom corners */}
        <div className={styles.squareBottomLeft}></div>
        <div className={styles.squareBottomRight}></div>
      </div>

      {/* Footer - full width outside content wrapper */}
      <Footer />
    </main>
  );
}
