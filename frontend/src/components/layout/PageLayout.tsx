import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { theme, motionVariants } from '../../lib/theme';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showBackground?: boolean;
}

export function PageLayout({
  children,
  title,
  description,
  showBackground = true,
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen w-full ${showBackground ? `bg-gradient-to-br ${theme.colors.background.gradient}` : ''}`}>
      {showBackground && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            {...motionVariants.float}
            className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          />
          <motion.div
            {...motionVariants.float}
            transition={{ delay: 0.2 }}
            className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
          />
          <motion.div
            {...motionVariants.float}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl"
          />
        </div>
      )}

      <div className="relative">
        {(title || description) && (
          <motion.div
            {...motionVariants.slideDown}
            className="mb-8 text-center"
          >
            {title && <h1 className={theme.typography.h1}>{title}</h1>}
            {description && <p className={theme.typography.body}>{description}</p>}
          </motion.div>
        )}

        <motion.div
          {...motionVariants.slideUp}
          className={theme.layout.container}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
} 