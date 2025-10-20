import axios from '@root/utils/axiosInstance';
import type { PlansDTO } from '@root/types/dto/plan.dto';
import type { Plan } from '@root/types/domain/plan';
import { mapPlansDTOtoPlans } from '@root/mappers';

const getPlans = async (): Promise<Plan[]> => {
  try {
    const { data } = await axios.get<PlansDTO>('/plans.json');
    return mapPlansDTOtoPlans(data);
  } catch (error) {
    console.error('[Error] Error getting plans list', error);
    throw error;
  }
};

const planService = Object.freeze({ getPlans });

export default planService;
