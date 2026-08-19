'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

/**
 * The only interactive part of the contact page. It posts straight to
 * web3forms from the browser, so the surrounding page stays a server
 * component and still renders its offices and metadata without JavaScript.
 */
const ContactForm = () => {
  const [state, setState] = useState({ sending: false, message: '', tone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ sending: true, message: '', tone: '' });

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form),
      });
      const result = await res.json();

      if (result.success) {
        setState({
          sending: false,
          message: 'Message sent successfully. We will be in touch soon.',
          tone: 'ok',
        });
        form.reset();
      } else {
        setState({ sending: false, message: 'Something went wrong. Please try again.', tone: 'error' });
      }
    } catch (error) {
      setState({
        sending: false,
        message: 'Network error. Please check your connection and try again.',
        tone: 'error',
      });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value="3f084174-d751-440f-9f4a-f0ab697f32d2" />
      <input type="hidden" name="subject" value="New Contact Message from AID Website" />

      <div className="field">
        <label htmlFor="name">Your name</label>
        <input type="text" name="name" id="name" autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor="email">Your email</label>
        <input type="email" name="email" id="email" autoComplete="email" required />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" rows="6" required />
      </div>

      <button type="submit" className="btn btn--primary" disabled={state.sending}>
        {state.sending ? 'Sending…' : 'Send Message'}
        <Send aria-hidden="true" />
      </button>

      <p className={`form-status form-status--${state.tone}`} role="status" aria-live="polite">
        {state.message}
      </p>
    </form>
  );
};

export default ContactForm;
