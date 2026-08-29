import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Typography, Card, Input, Button, FormField } from 'loka';
import { dbClient } from 'api-client';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const [view, setView] = useState<'login' | 'signup' | 'forgot_password'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (view === 'login') {
        await dbClient.auth.signInWithPassword(email, password);
        navigate(redirectTo);
      } else if (view === 'signup') {
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        await dbClient.auth.signUp(email, password, name);
        navigate(redirectTo);
      } else if (view === 'forgot_password') {
        try {
          await dbClient.auth.resetPassword(email);
          setSuccess('We have sent a password reset link to your email.');
        } catch (err: any) {
          if (err.message && err.message.includes('rate limit')) {
            setError('We are receiving too many requests right now. Please try again in a few minutes.');
          } else {
            throw err;
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white border border-[#eaeaea] shadow-[0_20px_40px_rgba(0,0,0,0.04)] rounded-[32px]">
        <div className="text-center mb-8">
          <Typography variant="h2" className="text-3xl font-extrabold tracking-tight mb-2">
            {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Create Account' : 'Reset Password'}
          </Typography>
          <Typography variant="body" className="text-neutral-500">
            {view === 'login' ? 'Sign in to access your tickets and reservations.' : view === 'signup' ? 'Join Venu to secure your next experience.' : 'Enter your email address and we will send you a link to reset your password.'}
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {view === 'signup' && (
            <FormField label="Full Name">
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormField>
          )}

          <FormField label="Email Address">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormField>

          {view !== 'forgot_password' && (
            <div className="space-y-2">
              <FormField label="Password">
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormField>
              {view === 'login' && (
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => { setView('forgot_password'); setError(''); setSuccess(''); }}
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <Typography variant="bodySm" className="text-red-600 font-medium text-center">
                {error}
              </Typography>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <Typography variant="bodySm" className="text-green-600 font-medium text-center">
                {success}
              </Typography>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full mt-4 bg-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : view === 'login' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-2">
          {view === 'forgot_password' ? (
            <Typography variant="bodySm" className="text-neutral-500">
              Remember your password?{' '}
              <button 
                type="button"
                onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </button>
            </Typography>
          ) : (
            <Typography variant="bodySm" className="text-neutral-500">
              {view === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
                className="text-primary font-bold hover:underline"
              >
                {view === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </Typography>
          )}
        </div>
      </Card>
    </div>
  );
};
