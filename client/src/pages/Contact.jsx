import React, { useState } from 'react';
import { AtSign, MapPin, Phone, Send } from 'lucide-react';

import { useBlock, useList } from '../context/CmsContext';
import { BRAND_PATHS, ORG, SOCIAL_LINKS } from '../data/site';
import { BrandIcon, PageHead } from '../components/ui';

const Contact = () => {
  const head = useBlock('contact.head');
  const offices = useList('contact.offices');

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
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell">
          <div className="contact-grid">
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

            <aside className="contact-aside">
              {offices.map((office) => (
                <article className="office-card" key={office.name}>
                  <h3>{office.name}</h3>
                  <p className="office-city">
                    <MapPin aria-hidden="true" />
                    {office.city}
                  </p>
                  {office.phone ? (
                    <p>
                      <a href={office.phoneHref || `tel:${office.phone.replace(/\s/g, '')}`}>
                        <Phone aria-hidden="true" />
                        {office.phone}
                      </a>
                    </p>
                  ) : null}
                  {office.email ? (
                    <p>
                      <a href={`mailto:${office.email}`}>
                        <AtSign aria-hidden="true" />
                        {office.email}
                      </a>
                    </p>
                  ) : null}
                </article>
              ))}

              <div className="contact-social">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label={s.name}
                  >
                    <BrandIcon path={s.path} label={s.name} />
                  </a>
                ))}
                <a
                  href={ORG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="WhatsApp"
                >
                  <BrandIcon path={BRAND_PATHS.whatsapp} label="WhatsApp" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
