import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import { Label } from '../../components/ui/Label';
import { useAuth } from '../../hooks/useAuth';
import { PageLayout } from '../../components/layout/PageLayout';
import { theme, motionVariants } from '../../lib/theme';
import { cn } from '../../lib/utils';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch('email');
  const isValidEmail = email && email.includes('@');

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(data.email, data.password);
      
      // Navigate to the attempted URL or dashboard
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* Logo */}
      <motion.div
        {...motionVariants.slideDown}
        className="mb-8 flex items-center justify-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className={cn(theme.typography.h2, "ml-3")}>Blackstone Board</h1>
      </motion.div>

      {/* Card */}
      <motion.div
        {...motionVariants.slideUp}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-lg"
      >
        <div className="mb-6 text-center">
          <h2 className={theme.typography.h3}>Welcome back</h2>
          <p className={theme.typography.body}>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={theme.spacing.section}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className={theme.spacing.stack}>
            <div className="flex items-center justify-between">
              <Label htmlFor="email" className={theme.typography.small}>
                Email
              </Label>
              {email && isValidEmail && (
                <span className="flex items-center text-xs text-emerald-400">
                  <Check className="mr-1 h-3 w-3" /> Valid email
                </span>
              )}
            </div>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className={cn(theme.typography.small, theme.colors.text.error)}>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className={theme.spacing.stack}>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className={theme.typography.small}>
                Password
              </Label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(theme.typography.small, "hover:text-white")}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className={cn(theme.typography.small, theme.colors.text.error)}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="remember"
              className={theme.typography.small}
            >
              Remember me for 30 days
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="secondary"
            >
              Inquiry Form
            </Button>
            <Button
              type="button"
              variant="secondary"
            >
              Official Website
            </Button>
          </div>
        </form>

        <p className={cn(theme.typography.small, "mt-6 text-center")}>
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-white hover:text-white/90">
            Sign up
          </a>
        </p>
      </motion.div>

      {/* Footer */}
      <motion.div
        {...motionVariants.fadeIn}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center text-xs text-white/50"
      >
        <p>© 2024 Blackstone Board. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="/terms" className="hover:text-white">
            Terms
          </a>
          <a href="/privacy" className="hover:text-white">
            Privacy
          </a>
          <a href="/contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </motion.div>
    </PageLayout>
  );
} 