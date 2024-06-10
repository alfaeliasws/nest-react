import { z, ZodType } from 'zod';

export class HeadlinerValidation {
  static readonly CREATE: ZodType = z.object({
    topic: z.string().min(1).max(100),
    headliner: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    topic: z.string().min(1).max(100).optional(),
    headliner: z.string().min(1).max(100).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    highlight: z.string().min(0).max(100).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
