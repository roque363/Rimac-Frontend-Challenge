import { useContext, useMemo } from 'react';
import { QuoteContext } from '@root/context/quote/QuoteContext';
import type { QuoteForm } from '@root/context/quote/quote.types';
import type { Plan } from '@root/types/domain/plan';
import type { QuoteFor } from '@root/context/quote/quote.types';

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider');

  const { state, dispatch } = ctx;

  const userAge = state.user?.age;
  const finalPrice = useMemo(() => {
    if (!state.selectedPlan) return undefined;
    const base = state.selectedPlan.price;
    return state.quoteFor === 'someone' ? +(base * 0.95).toFixed(2) : base;
  }, [state.selectedPlan, state.quoteFor]);

  const setForm = (payload: Partial<QuoteForm>) => dispatch({ type: 'FORM_SET', payload });

  const resetForm = () => dispatch({ type: 'FORM_RESET' });

  const setUser = (user: NonNullable<typeof state.user>) =>
    dispatch({ type: 'USER_SET', payload: user });

  const setQuoteFor = (q: QuoteFor) => dispatch({ type: 'QUOTE_FOR_SET', payload: q });

  const selectPlan = (plan: Plan) => dispatch({ type: 'PLAN_SELECT', payload: plan });

  const resetAll = () => dispatch({ type: 'STATE_RESET' });

  return {
    state,
    userAge,
    finalPrice,
    setForm,
    resetForm,
    setUser,
    setQuoteFor,
    selectPlan,
    resetAll,
  };
}
