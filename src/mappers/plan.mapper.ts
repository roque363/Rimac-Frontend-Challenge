import type { PlansDTO, PlanDTO } from '@root/types/dto/plan.dto';
import type { Plan } from '@root/types/domain/plan';

export function mapPlanDTO(dto: PlanDTO): Plan {
  return Object.freeze({
    id: crypto.randomUUID(),
    name: dto.name,
    price: dto.price,
    description: dto.description,
    age: dto.age,
  });
}

export function mapPlansDTOtoPlans(dto: PlansDTO): Plan[] {
  return dto.list.map(mapPlanDTO);
}
