import { useState, useCallback } from 'react';
import userService from '@root/services/user';
import type { User } from '@root/types/domain/user';
import type { QuoteForm } from '@root/context/quote/quote.types';

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const submitUserForm = useCallback(async (form: QuoteForm): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const apiUser = await userService.getUser();
      const merged: User = {
        ...apiUser,
        documentType: form.documentType,
        documentNumber: form.documentNumber,
        phone: form.phone,
      };
      return merged;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, submitUserForm };
}
