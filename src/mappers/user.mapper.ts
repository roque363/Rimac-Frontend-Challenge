import type { UserDTO } from '@root/types/dto/user.dto';
import type { User } from '@root/types/domain/user';
import { calculateAgeFromBirthDay } from '@root/utils/date.utils';

export function mapUserDTOtoUser(dto: UserDTO): User {
  const age = calculateAgeFromBirthDay(dto.birthDay);
  return Object.freeze({
    ...dto,
    age,
    documentType: 'DNI',
    documentNumber: '',
    phone: '',
  });
}
