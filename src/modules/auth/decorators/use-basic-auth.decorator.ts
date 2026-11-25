import { applyDecorators, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '../guards/basic-auth.guard';

export const UseBasicAuth = () => {
  return applyDecorators(UseGuards(BasicAuthGuard));
};
