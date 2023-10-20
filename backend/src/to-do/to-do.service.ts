import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  StatusEnum,
  TodoDTOForCreating,
  TodoDTOForUpdating,
  TodoEntity,
} from './to-do.types';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  // Basic CRUD
  findTodos() {
    return this.todoRepository.find();
  }

  findTodoById(idTodo: number) {
    return this.todoRepository.findBy({ id: idTodo });
  }

  createTodo(todoDTO: TodoDTOForCreating) {
    const newTodo = this.todoRepository.create({ ...todoDTO });
    return this.todoRepository.save(newTodo);
  }

  updateTodo(idTodo: number, todoDTO: TodoDTOForUpdating) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // By status
  // findTodoByStatus(status: StatusEnum) {
  //   return this.todoRepository.findAndCountBy({ status });
  // }

  findTodoByCondition(status: StatusEnum, name: string, description: string) {
    return this.todoRepository.findAndCountBy({ status, name, description });
  }
}
