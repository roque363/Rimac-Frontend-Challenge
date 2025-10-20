import type { User } from '@root/types/domain/user';
import type { Plan } from '@root/types/domain/plan';

export type QuoteFor = 'me' | 'someone';

export type QuoteForm = {
  dni: string;
  phone: string;
  privacy: boolean;
  comms: boolean;
};

export type QuoteState = {
  form: QuoteForm;
  user?: User;
  quoteFor?: QuoteFor;
  selectedPlan?: Plan;
};

export type QuoteAction =
  | { type: 'FORM_SET'; payload: Partial<QuoteForm> }
  | { type: 'FORM_RESET' }
  | { type: 'USER_SET'; payload: User }
  | { type: 'QUOTE_FOR_SET'; payload: QuoteFor }
  | { type: 'PLAN_SELECT'; payload: Plan }
  | { type: 'STATE_RESET' };
