import axiosInstance from '@root/utils/axiosInstance';
import type { UserDTO } from '@root/types/dto/user.dto';
import type { User } from '@root/types/domain/user';
import { mapUserDTOtoUser } from '@root/mappers';

const getUser = async (): Promise<User> => {
  try {
    const { data } = await axiosInstance.get<UserDTO>('/user.json');
    return mapUserDTOtoUser(data);
  } catch (error) {
    console.error('[Error] Error getting user data', error);
    throw error;
  }
};

const userService = Object.freeze({ getUser });

export default userService;
