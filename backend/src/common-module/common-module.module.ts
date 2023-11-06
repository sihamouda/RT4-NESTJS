import { Global, Module } from '@nestjs/common';
import { UUID_PROVIDER } from './uuid/uuid.provider';

@Global()
@Module({
  providers: [UUID_PROVIDER],
  exports: [UUID_PROVIDER],
})
export class CommonModuleModule {}
