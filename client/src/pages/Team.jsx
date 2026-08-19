import React from 'react';
import { AtSign, Phone } from 'lucide-react';

import { useBlock, useList } from '../context/CmsContext';
import { SOCIAL_LINKS } from '../data/site';
import { BrandIcon, Img, PageHead } from '../components/ui';

const Team = () => {
  const head = useBlock('team.head');
  const members = useList('team.members');

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell">
          <div className="team-grid">
            {members.map((member) => (
              <article className="team-card" key={member.email || member.name}>
                <Img className="team-photo" src={member.photo} alt={member.name} loading="lazy" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-desc">{member.desc}</p>
                <div className="team-contact">
                  {member.phone ? (
                    <a href={member.phoneHref || `tel:${member.phone.replace(/\s/g, '')}`}>
                      <Phone aria-hidden="true" />
                      {member.phone}
                    </a>
                  ) : null}
                  {member.email ? (
                    <a href={`mailto:${member.email}`}>
                      <AtSign aria-hidden="true" />
                      {member.email}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="social-row">
            <span className="social-row-label">Follow AID</span>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
