import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModuleModule } from './common-module/common-module.module';
import { UuidService } from './common-module/uuid/uuid.service';
import { UserModule } from './user/user.module';
import { ToDoModule } from './to-do/to-do.module';

@Module({
  imports: [CommonModuleModule, UserModule, ToDoModule],
  controllers: [AppController],
  providers: [AppService, UuidService],
})
export class AppModule {}
