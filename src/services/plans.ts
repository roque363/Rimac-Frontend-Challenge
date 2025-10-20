import type { PlansDTO } from '@root/types/dto/plan.dto';
import axios from '@root/utils/axiosInstance';

const getPlans = async (): Promise<PlansDTO> => {
  try {
    const response = await axios.get<PlansDTO>('/plans.json');
    return response?.data;
  } catch (error) {
    console.error('[Error] Error getting plans list', error);
    throw error;
  }
};

const planService = {
  getPlans,
};

export default planService;
