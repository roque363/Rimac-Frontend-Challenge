import type { UserDTO } from '@root/types/dto/user.dto';
import axiosInstance from '@root/utils/axiosInstance';

const getUser = async (): Promise<UserDTO> => {
  try {
    const response = await axiosInstance.get<UserDTO>('/user.json');
    return response?.data;
  } catch (error) {
    console.error('[Error] Error getting user data', error);
    throw error;
  }
};

const userService = {
  getUser,
};

export default userService;
