import type { ZodError } from 'zod';

export function getFirstZodMessage(error: ZodError): string {
  const { formErrors, fieldErrors } = error.flatten();
  return formErrors[0] ?? Object.values(fieldErrors).flat()[0] ?? 'Revisa el formulario';
}

export function zodErrorsByField(err: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join('.') || 'form';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
