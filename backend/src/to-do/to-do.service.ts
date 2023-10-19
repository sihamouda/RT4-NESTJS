import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDTO, TodoEntity } from './to-do.types';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  findTodos() {
    return this.todoRepository.find();
  }

  createTodo(todoDTO: TodoDTO) {
    const newTodo = this.todoRepository.create({ ...todoDTO });
    return this.todoRepository.save(newTodo);
  }
}
