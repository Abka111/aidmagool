import { AtSign, MapPin, Phone } from 'lucide-react';

import { getBlock, listOf } from '@/lib/cms';
import { pageMetadata } from '@/lib/metadata';
import { BRAND_PATHS, ORG, SOCIAL_LINKS } from '@/data/site';
import { BrandIcon, PageHead } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

export const revalidate = 60;

export const generateMetadata = async () => {
  const head = await getBlock('contact.head');
  return pageMetadata({
    title: head.title || 'Contact',
    description: head.lead,
    path: '/contact',
  });
};

const ContactPage = async () => {
  const head = await getBlock('contact.head');
  const offices = listOf(await getBlock('contact.offices'));

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell">
          <div className="contact-grid">
            <ContactForm />

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

export default ContactPage;
