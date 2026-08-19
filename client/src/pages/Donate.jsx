import React, { useEffect, useState } from 'react';

import { postPledge } from '../api/cms';
import { useBlock, useList } from '../context/CmsContext';
import { Icon, PageHead, SectionHead } from '../components/ui';

const Donate = () => {
  const head = useBlock('donate.head');
  const settings = useBlock('donate.settings');
  const amounts = useList('donate.settings', 'amounts');
  const methods = useList('donate.settings', 'methods');

  const [amount, setAmount] = useState(null);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState({ sending: false, message: '', tone: '' });

  // Preselect the second preset once the content has loaded.
  useEffect(() => {
    if (amount === null && amounts.length) setAmount(amounts[Math.min(1, amounts.length - 1)].value);
  }, [amounts, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ sending: true, message: '', tone: '' });

    const result = await postPledge({
      name: data.get('full-name'),
      email: data.get('donor-email'),
      // A typed custom amount wins over whichever preset is highlighted.
      amount: Number(custom || amount),
      method,
    });

    if (!result.ok) {
      setStatus({ sending: false, message: result.error, tone: 'error' });
      return;
    }

    setStatus({
      sending: false,
      message: settings.successMessage || 'Thank you. Our team will be in touch.',
      tone: 'ok',
    });
    form.reset();
    // The controlled fields keep their state through a native reset.
    setCustom('');
    setMethod('');
  };

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <section className="section section--paper">
        <div className="shell shell--narrow">
          <div className="donate-card">
            <SectionHead align="center" title={settings.cardTitle} />

            <form className="donate-form" onSubmit={handleSubmit}>
              <fieldset className="donate-fieldset">
                <legend>Choose an amount</legend>
                <div className="amount-row">
                  {amounts.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      className={`amount-btn ${amount === a.value && !custom ? 'is-selected' : ''}`}
                      aria-pressed={amount === a.value && !custom}
                      onClick={() => {
                        setAmount(a.value);
                        setCustom('');
                      }}
                    >
                      ${a.value}
                    </button>
                  ))}
                </div>
                <div className="field">
                  <label htmlFor="custom-amount">Or enter a custom amount (USD)</label>
                  <input
                    id="custom-amount"
                    name="custom-amount"
                    type="number"
                    min="1"
                    inputMode="decimal"
                    placeholder="e.g. 250"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                  />
                </div>
              </fieldset>

              <div className="field">
                <label htmlFor="full-name">Full name</label>
                <input id="full-name" name="full-name" type="text" autoComplete="name" required />
              </div>

              <div className="field">
                <label htmlFor="donor-email">Email address</label>
                <input id="donor-email" name="donor-email" type="email" autoComplete="email" required />
              </div>

              <div className="field">
                <label htmlFor="paymentMethod">Payment method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  required
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="">Choose payment method</option>
                  {methods.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {settings.helpText ? <p className="field-help">{settings.helpText}</p> : null}
              </div>

              <button type="submit" className="btn btn--primary btn--block" disabled={status.sending}>
                {status.sending ? 'Sending…' : settings.submitLabel || 'Donate Now'}
                <Icon name="HeartHandshake" />
              </button>

              <p className={`form-status form-status--${status.tone}`} role="status" aria-live="polite">
                {status.message}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;
