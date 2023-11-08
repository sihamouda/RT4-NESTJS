import { Injectable } from '@nestjs/common';

import { TodoDTO, TodoDTOForUpdating } from './to-do.dto';
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

  updateTodo(idTodo: number, todoDTO: TodoDTOForUpdating) {
    return this.todoRepository.update(
      { id: idTodo },
      {
        ...todoDTO,
      },
    );
  }

  deleteTodo(idTodo: number) {
    return this.todoRepository.softDelete({ id: idTodo });
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
