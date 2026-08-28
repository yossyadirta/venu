import React, { useState } from 'react';
import { Typography, Input, Button, FormField } from 'loka';

interface AttendeeFormProps {
  onSubmit: (name: string, email: string) => void;
  initialName?: string;
  initialEmail?: string;
}

export const AttendeeForm = ({ onSubmit, initialName = '', initialEmail = '' }: AttendeeFormProps) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', email: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email) {
      onSubmit(name, email);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <Typography variant="h2" className="mb-2">Attendee Information</Typography>
        <Typography variant="body" muted>Where should we send your digital ticket?</Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="Full Name" error={errors.name}>
          <Input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors(prev => ({...prev, name: ''})); }}
            placeholder="John Doe"
            className="w-full"
            error={!!errors.name}
          />
        </FormField>

        <FormField label="Email Address" error={errors.email}>
          <Input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({...prev, email: ''})); }}
            placeholder="john@example.com"
            className="w-full"
            error={!!errors.email}
          />
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
        >
          Continue to Payment
        </Button>
      </form>
    </div>
  );
};
