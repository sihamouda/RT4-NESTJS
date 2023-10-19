import { Module } from '@nestjs/common';
import { TodoService } from './to-do.service';
import { TodoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './to-do.types';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class ToDoModule {}
