import { Module } from '@nestjs/common';
import { TodoService } from './to-do.service';
import { TodoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './to-do.entity';
import { TodoRepository } from './to-do.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService, TodoRepository],
  controllers: [TodoController],
})
export class ToDoModule {}
