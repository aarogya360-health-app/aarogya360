import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'white' | 'dark' | 'outline';
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  hoverEffect = false,
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    glass: 'bg-white/80 backdrop-blur-md border border-white/60 shadow-card text-navy-800',
    white: 'bg-white border border-teal-800/10 shadow-card text-navy-800',
    dark: 'bg-gradient-to-br from-teal-900 to-navy-900 border border-teal-500/20 text-white shadow-glow-teal',
    outline: 'bg-white/40 border border-teal-800/15 text-navy-800',
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl p-6 transition-all duration-300 ${variantStyles[variant]} ${hoverEffect ? 'hover:shadow-glass-hover hover:border-emerald-500/30' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
