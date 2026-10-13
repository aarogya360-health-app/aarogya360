import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Activity,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { signUpSchema, SignUpFormData } from '@/utils/validation';
import { Button } from '@/components/common/Button';

export const SignUpPage: React.FC = () => {
  const { signUp, enableDemoSession, isConfigured } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setAuthError(null);
    const res = await signUp(data.email, data.password, data.displayName);
    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setAuthError(res.error || 'Failed to create account. Please verify input.');
    }
  };

  const handleInstantDemo = () => {
    enableDemoSession('Prardhana Rao');
    navigate('/dashboard', { replace: true });
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
            Create Your Health Account
          </h2>
          <p className="text-xs text-navy-600/80">
            Private, encrypted personal health organization.
          </p>
        </div>

        {/* Instant Sandbox Banner */}
        <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-800/15 text-xs text-navy-800 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-bold text-teal-900 block">Want to test right now?</span>
            <span className="text-[11px] text-navy-600">Enter directly with pre-loaded sample notes.</span>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleInstantDemo}
            className="shrink-0 text-xs"
          >
            Demo Mode →
          </Button>
        </div>

        {authError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                {...register('displayName')}
                placeholder="e.g. Prardhana Rao"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            {errors.displayName && (
              <p className="text-xs text-rose-600 mt-1">{errors.displayName.message}</p>
            )}
          </div>

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
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                {...register('password')}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-rose-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-navy-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder="Repeat password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-600 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="space-y-1 pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-navy-700">
              <input
                type="checkbox"
                {...register('agreeToTerms')}
                className="mt-0.5 rounded border-teal-800/20 text-emerald-600 focus:ring-emerald-500"
              />
              <span>
                I agree to the <Link to="/privacy" className="text-teal-800 font-semibold underline">Privacy Policy</Link> and acknowledge that Aarogya360 is an informational organizer, not a medical clinic or diagnostic service.
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-xs text-rose-600">{errors.agreeToTerms.message}</p>
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
            Create My Free Account
          </Button>
        </form>

        <div className="text-center pt-2 text-xs text-navy-600 border-t border-teal-800/10">
          <span>Already have an account? </span>
          <Link to="/signin" className="font-bold text-teal-800 hover:text-emerald-600 underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
