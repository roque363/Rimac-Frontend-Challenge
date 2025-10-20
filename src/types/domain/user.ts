export type DocumentType = 'DNI' | 'CE' | 'RUC';

export type User = {
  name: string;
  lastName: string;
  birthDay: string;
  age: number;
  documentType: DocumentType;
  documentNumber: string;
  phone: string;
};
