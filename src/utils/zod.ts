import type { ZodError } from 'zod';

export function getFirstZodMessage(error: ZodError): string {
  const { formErrors, fieldErrors } = error.flatten();
  return formErrors[0] ?? Object.values(fieldErrors).flat()[0] ?? 'Revisa el formulario';
}
