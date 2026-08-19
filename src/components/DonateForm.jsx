'use client';

import { useState } from 'react';

import { API_URL } from '@/lib/cms';
import { Icon } from '@/components/ui';

/**
 * Records a donation pledge. Resolves to { ok: true } only on a 201 so the page
 * never reports success for a pledge the backend did not store.
 */
const postPledge = async (pledge, { timeout = 8000 } = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(`${API_URL}/api/pledges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pledge),
      signal: controller.signal,
    });

    if (res.status === 201) return { ok: true };

    // Validation failures answer with { error }; other statuses may carry no
    // body at all, so fall back to the status code.
    const data = await res.json().catch(() => ({}));
    return { ok: false, error: data.error || `Request failed with status ${res.status}` };
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' };
  } finally {
    clearTimeout(timer);
  }
};

const DonateForm = ({ settings = {}, amounts = [], methods = [] }) => {
  // The presets arrive from the server, so the second one can be selected on
  // the first render instead of waiting for content to load in an effect.
  const [amount, setAmount] = useState(
    amounts.length ? amounts[Math.min(1, amounts.length - 1)].value : null,
  );
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState('');
  const [status, setStatus] = useState({ sending: false, message: '', tone: '' });

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
  );
};

export default DonateForm;
