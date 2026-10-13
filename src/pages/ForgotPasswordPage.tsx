import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword, isConfigured } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPassword(email);
      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || 'Failed to send password reset instructions.');
      }
    } catch (err: any) {
      setError(err?.message || 'Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-teal-800/10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-800 text-white mx-auto flex items-center justify-center shadow-md">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-navy-800 font-display">
            Reset Account Password
          </h2>
          <p className="text-xs text-navy-600/80">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">
              Recovery Link Dispatched
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              If an account is associated with <strong>{email}</strong>, password reset instructions have been forwarded. Please inspect your inbox and spam folders.
            </p>
            <div className="pt-2">
              <Link to="/signin">
                <Button variant="primary" size="sm" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
            >
              Send Password Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-emerald-600"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
