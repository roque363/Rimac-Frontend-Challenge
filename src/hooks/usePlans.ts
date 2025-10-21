import { useEffect, useMemo, useState } from 'react';
import planService from '@root/services/plans';
import type { Plan } from '@root/types/domain/plan';
import HomeIcon from '@root/assets/icons/home-light.svg';
import HospitalIcon from '@root/assets/icons/home-light.svg';

export function usePlans(userAge?: number) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await planService.getPlans();
        const newData = data.map((plan: Plan) => ({
          icon: plan.name.includes('Clínica') ? HospitalIcon : HomeIcon,
          discountPrice: 0.95 * plan.price,
          ...plan,
        }));
        setPlans(newData);
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
