export type PlanDTO = {
  name: string;
  price: number;
  description: string[];
  age: number;
};

export type PlansDTO = {
  list: PlanDTO[];
};
