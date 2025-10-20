export type Plan = {
  id: string;
  icon?: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string[];
  age: number;
};

export type Plans = Array<Plan>;
