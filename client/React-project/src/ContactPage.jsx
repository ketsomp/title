import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us via the following platforms:</p>
      <div className="contact-info">
        <p>
          <a href="https://www.instagram.com/amoghvarsh17" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </p>
        <p>
          <a href="https://www.facebook.com/clinton.underpants" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </p>
        <p>WhatsApp: +91 9380015768</p>
      </div>
    </div>
  );
};

export default ContactPage;
