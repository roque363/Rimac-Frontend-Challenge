import React, { createContext, useReducer } from 'react';
import { initialQuoteState, quoteReducer } from './quote.reducer';
import type { QuoteState, QuoteAction } from './quote.types';

type QuoteContextValue = {
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
};

export const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, initialQuoteState);

  const value: QuoteContextValue = { state, dispatch };

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}
