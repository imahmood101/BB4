import cookieParser from 'cookie-parser';

export const cookieParserConfig = cookieParser(process.env.COOKIE_SECRET || 'your-secret-key', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}); 