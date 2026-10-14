import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { dbClient } from 'api-client';

export type AuthView = 'login' | 'signup' | 'forgot_password' | 'update_password';

export const useAuthForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const isResetParam = searchParams.get('reset') === 'true';
    const isRecoveryHash = typeof window !== 'undefined' && window.location.hash.includes('type=recovery');

    if (isResetParam || isRecoveryHash) {
      setView('update_password');
    }

    const subscription = dbClient.auth.onAuthStateChange?.((event: string) => {
      if (event === 'PASSWORD_RECOVERY') {
        setView('update_password');
      }
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, [searchParams]);

  const switchView = (nextView: AuthView) => {
    setView(nextView);
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
  };

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
      } else if (view === 'update_password') {
        if (password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }

        await dbClient.auth.updatePassword(password);
        setSuccess('Your password has been successfully updated! Redirecting to sign in...');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          switchView('login');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
