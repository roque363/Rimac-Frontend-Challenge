import { z } from 'zod';

export const DocumentTypeEnum = z.enum(['DNI', 'CE', 'RUC']);

const onlyDigits = /^\d+$/;
const cePattern = /^[A-Za-z0-9-]+$/;

export const homeSchema = z
  .object({
    documentType: DocumentTypeEnum.default('DNI'),
    documentNumber: z.string().min(1, 'Ingrese su número de documento'),
    phone: z
      .string()
      .min(9, 'El número debe tener 9 dígitos')
      .max(9, 'El número debe tener 9 dígitos')
      .regex(/^[0-9]+$/, 'Solo se permiten números'),
    privacy: z.literal(true, { message: 'Debe aceptar la política de privacidad' }),
    comms: z.boolean().optional(),
  })
  .refine(
    (v) =>
      v.documentType !== 'DNI' ||
      (v.documentNumber.length === 8 && onlyDigits.test(v.documentNumber)),
    { path: ['documentNumber'], message: 'El DNI debe tener 8 dígitos' }
  )
  .refine(
    (v) =>
      v.documentType !== 'RUC' ||
      (v.documentNumber.length === 11 && onlyDigits.test(v.documentNumber)),
    { path: ['documentNumber'], message: 'El RUC debe tener 11 dígitos' }
  )
  .refine(
    (v) =>
      v.documentType !== 'CE' ||
      (v.documentNumber.length >= 9 &&
        v.documentNumber.length <= 12 &&
        cePattern.test(v.documentNumber)),
    { path: ['documentNumber'], message: 'La CE debe tener 9–12 caracteres (alfanuméricos)' }
  );
