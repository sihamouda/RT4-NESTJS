import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './to-do.entity';
import { TodoDTOForCreating, TodoDTOForUpdating } from './to-do.dto';
import { StatusEnum } from './to-do.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  // Basic CRUD
  getTodos() {
    return this.todoRepository.find();
  }

  getTodoById(idTodo: number) {
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

  getTodoByCondition(status: StatusEnum, name: string, description: string) {
    return this.todoRepository.findAndCountBy({ status, name, description });
  }

  async getTodosPaginated(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = this.todoRepository.createQueryBuilder('todo');
    const todos = await queryBuilder
      .select()
      .skip(offset)
      .take(pageSize)
      .getMany();

    return todos;
  }
}
