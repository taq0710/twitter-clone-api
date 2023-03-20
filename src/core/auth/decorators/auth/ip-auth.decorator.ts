import { IpGuard } from '../../guards/ips/ip.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export const IpAuth = (...ips: string[]) => {
  return applyDecorators(SetMetadata('ips', ips), UseGuards(IpGuard));
};
