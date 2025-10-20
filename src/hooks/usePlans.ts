import { useEffect, useMemo, useState } from 'react';
import planService from '@root/services/plans';
import type { Plan } from '@root/types/domain/plan';

export function usePlans(userAge?: number) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setPlans(await planService.getPlans());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const visiblePlans = useMemo(() => {
    if (userAge == null) return [];
    return plans.filter((p) => userAge <= p.age);
  }, [plans, userAge]);

  return { plans, visiblePlans, loading, error };
}
