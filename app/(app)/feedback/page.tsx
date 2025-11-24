'use client';

import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import FormSection from '@/components/forms/FormSection';
import TextAreaField from '@/components/forms/TextAreaField';
import TextField from '@/components/forms/TextField';
import PrimaryButton from '@/components/forms/PrimaryButton';

export default function FeedbackPage() {
  const [message, setMessage] = useState('');
  const [wantsReply, setWantsReply] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Bitte beschreibe dein Anliegen.');
      return;
    }
    if (wantsReply && (!email || !email.includes('@'))) {
      alert('Bitte eine gültige E-Mail angeben.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, wantsReply, email })
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setMessage('');
      setEmail('');
      setWantsReply(false);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Feedbackbox"
        description={
          <p>
            Teile bitte auch sensible Themen. Deine Nachricht kann anonym bleiben, wenn du keine Rückmeldung wünschst. Wir lesen jede
            Nachricht aufmerksam.
          </p>
        }
      />

      {status === 'success' && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">Danke für dein Feedback!</div>
      )}
      {status === 'error' && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">Etwas ist schiefgelaufen. Bitte versuche es erneut.</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormSection>
          <TextAreaField
            label="Dein Anliegen, Feedback, Problem"
            name="message"
            required
            value={message}
            onChange={setMessage}
            placeholder="Schreibe hier dein Feedback..."
            maxLength={6000}
          />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={wantsReply} onChange={(e) => setWantsReply(e.target.checked)} />
            <span>Ich möchte eine Rückmeldung erhalten</span>
          </label>
          {wantsReply && (
            <TextField label="E-Mail" name="email" type="email" required value={email} onChange={setEmail} placeholder="you@example.com" />
          )}
          <PrimaryButton type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Senden…' : 'Feedback senden'}
          </PrimaryButton>
        </FormSection>
      </form>
    </div>
  );
}
