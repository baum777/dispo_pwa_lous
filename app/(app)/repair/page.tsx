'use client';

import { useState } from 'react';
import FormSection from '@/components/forms/FormSection';
import TextField from '@/components/forms/TextField';
import SelectField from '@/components/forms/SelectField';
import TextAreaField from '@/components/forms/TextAreaField';
import FileUploadField from '@/components/forms/FileUploadField';
import PrimaryButton from '@/components/forms/PrimaryButton';
import PageHeader from '@/components/layout/PageHeader';

const locationOptions = [
  { value: 'truck', label: 'Foodtruck' },
  { value: 'lager', label: 'Lager' },
  { value: 'event', label: 'Event-Standort' }
];

const areaOptions = [
  { value: 'kueche', label: 'Küche' },
  { value: 'technik', label: 'Technik' },
  { value: 'fahrzeug', label: 'Fahrzeug' }
];

const itemOptions = [
  { value: 'kuehlschrank', label: 'Kühlschrank' },
  { value: 'spuele', label: 'Spüle' },
  { value: 'zapfanlage', label: 'Zapfanlage' },
  { value: 'sonstiges', label: 'Sonstiges' }
];

export default function RepairPage() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !area || !item || !description) {
      alert('Bitte alle Pflichtfelder ausfüllen.');
      return;
    }

    setStatus('submitting');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('area', area);
    formData.append('item', item);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      const res = await fetch('/api/repair', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setName('');
      setLocation('');
      setArea('');
      setItem('');
      setDescription('');
      setFile(undefined);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Reparatur"
        description={
          <ul className="list-disc pl-5 text-sm text-slate-700">
            <li>Schreibe möglichst genau auf, was defekt ist.</li>
            <li>Füge ein Foto oder Video hinzu, wenn möglich.</li>
            <li>Wir melden uns, falls wir Rückfragen haben.</li>
          </ul>
        }
      />

      {status === 'success' && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">Vielen Dank! Deine Meldung wurde gesendet.</div>
      )}
      {status === 'error' && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">Es gab ein Problem beim Senden. Bitte versuche es erneut.</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormSection>
          <TextField label="Name" name="name" required value={name} onChange={setName} />
          <SelectField label="Wo ist etwas defekt?" name="location" required value={location} onChange={setLocation} options={locationOptions} />
          <SelectField label="Defekt-Bereich?" name="area" required value={area} onChange={setArea} options={areaOptions} />
          <SelectField label="Was ist defekt?" name="item" required value={item} onChange={setItem} options={itemOptions} />
          <FileUploadField label="Bild oder Video" name="file" file={file} onChange={setFile} />
          <TextAreaField label="Bitte beschreibe kurz den Defekt" name="description" required value={description} onChange={setDescription} maxLength={600} />
          <PrimaryButton type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Senden…' : 'Meldung senden'}
          </PrimaryButton>
        </FormSection>
      </form>
    </div>
  );
}
