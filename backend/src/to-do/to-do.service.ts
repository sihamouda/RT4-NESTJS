import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  getTodoByName(status: StatusEnum, name: string) {
    return this.todoRepository.findBy({ status, name: Like(`%${name}%`) });
  }

  getTodoByDescription(status: StatusEnum, description: string) {
    return this.todoRepository.findAndCountBy({
      status,
      description: Like(`%${description}%`),
    });
  }

  async getTodosPaginated(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;

    return this.todoRepository.find({
      skip: offset,
      take: pageSize,
    });

    const queryBuilder = this.todoRepository.createQueryBuilder('todo');
    const todos = await queryBuilder
      .select()
      .skip(offset)
      .take(pageSize)
      .getMany();

    return todos;
  }
}
