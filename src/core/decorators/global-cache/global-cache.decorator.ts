import { applyDecorators, SetMetadata } from '@nestjs/common';

export const GlobalCache = () => {
  return applyDecorators(SetMetadata('global-cache', 'true'));
};
