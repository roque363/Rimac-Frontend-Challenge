import type { QuoteAction, QuoteForm, QuoteState } from './quote.types';

export const initialForm: QuoteForm = {
  dni: '',
  phone: '',
  privacy: false,
  comms: false,
};

export const initialQuoteState: QuoteState = {
  form: initialForm,
  user: undefined,
  quoteFor: undefined,
  selectedPlan: undefined,
};

export function quoteReducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case 'FORM_SET':
      return { ...state, form: { ...state.form, ...action.payload } };
    case 'FORM_RESET':
      return { ...state, form: initialForm };
    case 'USER_SET':
      return { ...state, user: action.payload };
    case 'QUOTE_FOR_SET':
      return { ...state, quoteFor: action.payload };
    case 'PLAN_SELECT':
      return { ...state, selectedPlan: action.payload };
    case 'STATE_RESET':
      return initialQuoteState;
    default:
      return state;
  }
}
