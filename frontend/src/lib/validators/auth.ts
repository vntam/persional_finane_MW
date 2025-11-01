import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z
    .string()
    .trim()
    .max(60, 'Name is too long')
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

export type RegisterValues = z.infer<typeof registerSchema>;
