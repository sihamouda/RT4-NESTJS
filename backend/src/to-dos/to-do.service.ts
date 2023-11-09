import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { TodoDTO, TodoUptateDTO } from './to-do.dto';
import { StatusEnum } from './to-do.enum';
import { TodoRepository } from './to-do.repository';
import { PaginationOptions } from './to-do.types';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  // Basic CRUD
  getTodos(paginationOptions: PaginationOptions) {
    return this.todoRepository.getTodos(paginationOptions);
  }

  getTodoById(id: number, paginationOptions: PaginationOptions) {
    return this.todoRepository.getTodoById(id, paginationOptions);
  }

  createTodo(todoDTO: TodoDTO) {
    const newTodo = this.todoRepository.create({ ...todoDTO });
    return this.todoRepository.save(newTodo);
  }

  async updateTodo(id: number, todoDTO: TodoUptateDTO) {
    try {
      return await this.todoRepository.updateTodo(id, todoDTO);
    } catch (e) {
      if (e.message === 'unautherized') {
        throw new UnauthorizedException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteTodo(id: number, userId: string) {
    try {
      return await this.todoRepository.deleteTodo(id, userId);
    } catch (e) {
      if (e.message === 'unautherized') {
        throw new UnauthorizedException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  getTodoByCondition(
    status: StatusEnum,
    condition: string,
    conditionValue: string,
    paginationOptions: PaginationOptions,
  ) {
    return this.todoRepository.getTodoByCondition(
      status,
      condition,
      conditionValue,
      paginationOptions,
    );
  }
}
