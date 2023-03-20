import { applyDecorators, SetMetadata } from '@nestjs/common';
import { RoleType } from '../../enums/role-type.enum';

export const MethodAuth = (method: RoleType) => {
  return applyDecorators(SetMetadata('method', `${method}`));
};
