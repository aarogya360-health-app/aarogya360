import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Activity,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Database,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { signInSchema, SignInFormData } from '@/utils/validation';
import { Button } from '@/components/common/Button';

export const SignInPage: React.FC = () => {
  const { signIn, enableDemoSession, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setAuthError(null);
    const res = await signIn(data.email, data.password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setAuthError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleInstantDemo = () => {
    enableDemoSession('Prardhana Rao');
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-teal-800/10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-800 to-emerald-500 text-white flex items-center justify-center shadow-md">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-navy-800 font-display">
              Aarogya<span className="text-emerald-500">360</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-navy-800 pt-2 font-display">
            Sign In to Your Health Space
          </h2>
          <p className="text-xs text-navy-600/80">
            Access your encrypted health notes, reports, and care schedule.
          </p>
        </div>

        {/* Demo Mode Quick Access Pill */}
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-800/15 text-xs text-navy-800 space-y-2">
          <div className="flex items-center justify-between font-bold text-teal-900">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Instant Sandbox Preview
            </span>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900 font-bold">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-navy-600 leading-snug">
            {!isConfigured
              ? 'Supabase cloud keys are not yet configured in .env. Click below to experience the entire app immediately in local offline mode.'
              : 'Test all features with pre-configured health data.'}
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleInstantDemo}
            className="w-full bg-white text-teal-900 border-teal-800/20 hover:border-emerald-500"
          >
            Launch Instant Demo Mode →
          </Button>
        </div>

        {/* Error notification */}
        {authError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                {...register('email')}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-navy-800">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs font-semibold text-teal-800 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-rose-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In with Email
          </Button>
        </form>

        {/* Footer links */}
        <div className="text-center pt-2 text-xs text-navy-600 border-t border-teal-800/10">
          <span>Don't have an Aarogya360 account? </span>
          <Link to="/signup" className="font-bold text-teal-800 hover:text-emerald-600 underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
