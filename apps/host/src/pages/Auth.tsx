import React from 'react';
import { Typography, Card, Input, Button, FormField } from 'loka';
import { useAuthForm } from '../hooks/useAuthForm';

export const Auth = () => {
  const {
    view,
    switchView,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    loading,
    error,
    success,
    handleSubmit,
  } = useAuthForm();

  const getTitle = () => {
    switch (view) {
      case 'signup':
        return 'Create Account';
      case 'forgot_password':
        return 'Reset Password';
      case 'update_password':
        return 'Set New Password';
      default:
        return 'Welcome Back';
    }
  };

  const getSubtitle = () => {
    switch (view) {
      case 'signup':
        return 'Join Venu to secure your next experience.';
      case 'forgot_password':
        return 'Enter your email address and we will send you a link to reset your password.';
      case 'update_password':
        return 'Enter and confirm your new password to secure your account.';
      default:
        return 'Sign in to access your tickets and reservations.';
    }
  };

  const getButtonText = () => {
    if (loading) return 'Processing...';
    switch (view) {
      case 'signup':
        return 'Create Account';
      case 'forgot_password':
        return 'Send Reset Link';
      case 'update_password':
        return 'Update Password';
      default:
        return 'Sign In';
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white border border-[#eaeaea] shadow-[0_20px_40px_rgba(0,0,0,0.04)] rounded-[32px]">
        <div className="text-center mb-8">
          <Typography variant="h2" className="text-3xl font-extrabold tracking-tight mb-2">
            {getTitle()}
          </Typography>
          <Typography variant="body" className="text-neutral-500">
            {getSubtitle()}
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

          {view !== 'update_password' && (
            <FormField label="Email Address">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormField>
          )}

          {view !== 'forgot_password' && (
            <div className="space-y-2">
              <FormField label={view === 'update_password' ? 'New Password' : 'Password'}>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormField>

              {view === 'update_password' && (
                <FormField label="Confirm New Password">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </FormField>
              )}

              {view === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => switchView('forgot_password')}
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
            {getButtonText()}
          </Button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-2">
          {view === 'update_password' ? (
            <Typography variant="bodySm" className="text-neutral-500">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => switchView('login')}
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </button>
            </Typography>
          ) : view === 'forgot_password' ? (
            <Typography variant="bodySm" className="text-neutral-500">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => switchView('login')}
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </button>
            </Typography>
          ) : (
            <Typography variant="bodySm" className="text-neutral-500">
              {view === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
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
