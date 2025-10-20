import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { initialQuoteState, quoteReducer } from './quote.reducer';
import type { QuoteState, QuoteAction } from './quote.types';

type QuoteContextValue = {
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
  userAge?: number;
  finalPrice?: number;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialQuoteState);

  const userAge = state.user?.age;

  const finalPrice = useMemo(() => {
    if (!state.selectedPlan) return undefined;
    const base = state.selectedPlan.price;
    return state.quoteFor === 'someone' ? +(base * 0.95).toFixed(2) : base;
  }, [state.selectedPlan, state.quoteFor]);

  const value: QuoteContextValue = { state, dispatch, userAge, finalPrice };

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider');
  return ctx;
};
