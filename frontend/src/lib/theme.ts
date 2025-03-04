import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Theme colors
export const theme = {
  colors: {
    primary: {
      gradient: 'from-violet-600 to-indigo-600',
      hover: 'from-violet-700 to-indigo-700',
      text: 'text-white',
    },
    background: {
      gradient: 'from-purple-900 via-violet-800 to-indigo-900',
      glass: 'bg-white/5',
      border: 'border-white/10',
    },
    text: {
      primary: 'text-white',
      secondary: 'text-white/70',
      muted: 'text-white/50',
      error: 'text-red-400',
      success: 'text-emerald-400',
    },
    input: {
      base: 'border-white/10 bg-white/5 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-white/20',
    },
    button: {
      primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700',
      secondary: 'border-white/10 bg-white/5 text-white hover:bg-white/10',
    },
  },
  animations: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
    float: {
      initial: { opacity: 0 },
      animate: { opacity: 0.5 },
      transition: { duration: 1 },
    },
  },
  layout: {
    container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    card: 'rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg',
    section: 'space-y-6',
  },
  typography: {
    h1: 'text-4xl font-bold text-white',
    h2: 'text-3xl font-bold text-white',
    h3: 'text-2xl font-bold text-white',
    h4: 'text-xl font-bold text-white',
    body: 'text-white/70',
    small: 'text-sm text-white/50',
  },
  spacing: {
    section: 'space-y-6',
    stack: 'space-y-4',
    inline: 'space-x-4',
  },
} as const;

// Common component variants
export const variants = {
  card: {
    base: cn(theme.layout.card),
    glass: cn(theme.layout.card, 'bg-white/5 backdrop-blur-lg'),
  },
  button: {
    primary: cn('btn', theme.colors.button.primary),
    secondary: cn('btn', theme.colors.button.secondary),
  },
  input: {
    base: cn('input', theme.colors.input.base),
  },
} as const;

// Animation variants
export const motionVariants = {
  fadeIn: theme.animations.fadeIn,
  slideUp: theme.animations.slideUp,
  slideDown: theme.animations.slideDown,
  float: theme.animations.float,
} as const; 