import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Input, Button, cn, Toast } from 'loka';

export const InteractiveCreditCard = ({ step, onSubmit }: any) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (number.length < 19) newErrors.number = 'Card number must be 16 digits';
    if (!name.trim()) newErrors.name = 'Name on card is required';
    if (expiry.length < 5) newErrors.expiry = 'Invalid expiry date';
    if (cvv.length < 3) newErrors.cvv = 'CVV must be 3 or 4 digits';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidationError('Please fix the highlighted fields.');

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: -10 },
          {
            x: 10,
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            onComplete: () => gsap.set(cardRef.current, { x: 0 }),
          }
        );
      }
      return;
    }

    setValidationError(null);
    onSubmit();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isFlipped) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (isFlipped) return;
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      if (isFlipped) {
        gsap.to(cardRef.current, { rotateY: 180, rotateX: 0, duration: 0.8, ease: 'power3.inOut' });
      } else {
        gsap.to(cardRef.current, { rotateY: 0, duration: 0.8, ease: 'power3.inOut' });
      }
    }
  }, [isFlipped]);

  const handleCvvFocus = () => setIsFlipped(true);
  const handleCvvBlur = () => setIsFlipped(false);

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return val;
    }
  };

  const displayNum = number || '•••• •••• •••• ••••';
  const displayName = name || 'YOUR NAME';
  const displayExpiry = expiry || 'MM/YY';

  return (
    <div className="w-full">
      <div
        className="w-full h-[220px] mb-10 perspective-[1000px] relative z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className="w-full h-full relative preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            ref={frontRef}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden p-6 flex flex-col justify-between backface-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            <div className="flex justify-between items-center relative z-10">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path
                  d="M40 12C40 18.6274 34.6274 24 28 24C21.3726 24 16 18.6274 16 12C16 5.37258 21.3726 0 28 0C34.6274 0 40 5.37258 40 12Z"
                  fill="#FF5F00"
                />
                <path
                  d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
                  fill="#EB001B"
                />
              </svg>
              <div className="w-12 h-8 rounded bg-gradient-to-br from-[#d4af37] to-[#aa7c11] opacity-80" />
            </div>

            <div className="relative z-10">
              <p className="text-white/80 font-mono text-2xl tracking-[0.2em] mb-4 drop-shadow-md">
                {displayNum}
              </p>
              <div className="flex justify-between items-end uppercase text-white/90">
                <div>
                  <p className="text-[10px] text-white/50 mb-1">Card Holder</p>
                  <p className="font-bold tracking-widest text-sm truncate max-w-[150px]">
                    {displayName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/50 mb-1">Expires</p>
                  <p className="font-bold tracking-widest text-sm">{displayExpiry}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={backRef}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="w-full h-12 bg-black mt-6" />
            <div className="px-6 mt-4 relative">
              <p className="text-right text-[10px] text-white/50 mb-1 uppercase tracking-widest">
                CVV
              </p>
              <div className="w-full h-10 bg-white rounded flex items-center justify-end px-4">
                <span className="text-black font-mono text-lg italic">{cvv || '•••'}</span>
              </div>
            </div>
            <div className="mt-auto p-4 text-center">
              <p className="text-[8px] text-white/30 uppercase">
                This card is issued by Venu Bank. Subject to Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={validationError || ''}
        isVisible={!!validationError}
        onClose={() => setValidationError(null)}
        type="error"
      />

      <form onSubmit={handleFormSubmit} noValidate className="space-y-5 relative z-20">
        <div>
          <label className="block text-[11px] font-bold text-black/50 uppercase tracking-widest mb-1.5">
            Card Number
          </label>
          <Input
            placeholder="0000 0000 0000 0000"
            value={number}
            onChange={(e) => {
              setNumber(formatCardNumber(e.target.value));
              setErrors((prev) => ({ ...prev, number: '' }));
            }}
            maxLength={19}
            error={!!errors.number}
            className="h-12"
          />
          {errors.number && (
            <p className="text-xs text-red-500 font-bold mt-1.5 tracking-wide">{errors.number}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-bold text-black/50 uppercase tracking-widest mb-1.5">
            Name on Card
          </label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={!!errors.name}
            className="h-12"
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-bold mt-1.5 tracking-wide">{errors.name}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-black/50 uppercase tracking-widest mb-1.5">
              Expiry Date
            </label>
            <Input
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                if (val.length >= 2) {
                  setExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
                } else {
                  setExpiry(val);
                }
                setErrors((prev) => ({ ...prev, expiry: '' }));
              }}
              maxLength={5}
              error={!!errors.expiry}
              className="h-12"
            />
            {errors.expiry && (
              <p className="text-xs text-red-500 font-bold mt-1.5 tracking-wide">{errors.expiry}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-black/50 uppercase tracking-widest mb-1.5">
              CVV
            </label>
            <Input
              placeholder="123"
              value={cvv}
              onChange={(e) => {
                setCvv(e.target.value.replace(/\D/g, '').slice(0, 4));
                setErrors((prev) => ({ ...prev, cvv: '' }));
              }}
              onFocus={handleCvvFocus}
              onBlur={handleCvvBlur}
              maxLength={4}
              error={!!errors.cvv}
              className="h-12"
            />
            {errors.cvv && (
              <p className="text-xs text-red-500 font-bold mt-1.5 tracking-wide">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            variant="primary"
            className={cn(
              'w-full h-14 text-lg font-bold group relative overflow-hidden',
              step === 'processing' && 'opacity-80 cursor-wait'
            )}
            disabled={step === 'processing'}
          >
            {step === 'processing' ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              <>
                <span className="relative z-10">Pay Now</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </>
            )}
          </Button>
          <p className="text-center text-xs text-black/40 mt-4 font-medium">
            Secured by 256-bit encryption
          </p>
        </div>
      </form>
    </div>
  );
};
