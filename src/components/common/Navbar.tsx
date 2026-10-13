import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Shield,
  Activity,
  HeartPulse,
  LayoutDashboard,
  User,
  LogOut,
  Sparkles,
  Volume2,
  Stethoscope,
  Smile,
  Info
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const { user, signOut, isConfigured, authMode } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Symptom Info', href: '/symptoms' },
    { name: 'Daily Wellness', href: '/wellness' },
    { name: 'About', href: '/#about' },
    { name: 'Medical Safety', href: '/disclaimer' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-teal-800/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-800 via-teal-700 to-emerald-500 p-0.5 shadow-md group-hover:shadow-glow-emerald transition-shadow duration-300">
              <div className="w-full h-full bg-teal-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                <Activity className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-navy-800 font-display">
                Aarogya<span className="text-emerald-500">360</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-700 -mt-0.5">
                Living Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    active
                      ? 'text-teal-900 font-semibold bg-emerald-500/10'
                      : 'text-navy-700 hover:text-teal-900 hover:bg-teal-50/60'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth Actions & Status Pill */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<LayoutDashboard className="w-4 h-4 text-emerald-300" />}
                  >
                    Dashboard
                  </Button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-navy-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Sign Out"
                  aria-label="Sign out of account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Sparkles className="w-4 h-4 text-emerald-300" />}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {user && (
              <Link to="/dashboard" className="sm:hidden">
                <Button variant="primary" size="sm">
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-navy-800 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-b border-teal-800/10 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-emerald-500/10 text-teal-900 font-semibold'
                      : 'text-navy-800 hover:bg-teal-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-teal-800/10 flex flex-col gap-2.5">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="primary" size="md" className="w-full" leftIcon={<LayoutDashboard className="w-4 h-4" />}>
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full"
                      leftIcon={<LogOut className="w-4 h-4 text-rose-500" />}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="secondary" size="md" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button variant="primary" size="md" className="w-full" leftIcon={<Sparkles className="w-4 h-4" />}>
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
