import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TodoEntity } from './to-do.entity';
import { StatusEnum } from './to-do.enum';
import { PaginationOptions } from './to-do.types';
import { Injectable } from '@nestjs/common';
// import { TODO_TABLE_NAME } from 'src/common-module/constants/constants';
import { TodoUptateDTO } from './to-do.dto';

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(private dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager());
  }

  handlePaginationForQueryBuilderSelection(
    queryBuilderSelection: SelectQueryBuilder<TodoEntity>,
    paginationOptions: PaginationOptions,
  ) {
    const isPaginated: boolean = typeof paginationOptions !== undefined;
    if (!isPaginated) {
      paginationOptions.offset = 0;
      paginationOptions.limit = 2;
    }
    return queryBuilderSelection
      .skip(paginationOptions.offset)
      .take(paginationOptions.limit)
      .getMany();
  }

  getTodos(paginationOptions: PaginationOptions) {
    const todos = this.createQueryBuilder().select();
    return this.handlePaginationForQueryBuilderSelection(
      todos,
      paginationOptions,
    );
  }

  getTodoById(id: number, paginationOptions: PaginationOptions) {
    const todoById = this.createQueryBuilder()
      .select()
      .where(`id = :id`, { id });
    return this.handlePaginationForQueryBuilderSelection(
      todoById,
      paginationOptions,
    );
  }

  getTodoByCondition(
    status: StatusEnum,
    condition: string,
    conditionValue: string,
    paginationOptions: PaginationOptions,
  ) {
    const todoByCondition = this.createQueryBuilder()
      .select()
      .where(`status = :status AND ${condition} = :${condition}`, {
        status,
        [condition]: conditionValue,
      });
    return this.handlePaginationForQueryBuilderSelection(
      todoByCondition,
      paginationOptions,
    );
  }

  async updateTodo(id: number, todoUpdateDTO: TodoUptateDTO) {
    const currentTodo = await this.createQueryBuilder()
      .select()
      .where(`id = :id AND userId = :userId`, {
        id,
        userId: todoUpdateDTO.userId,
      })
      .getOne();
    if (currentTodo === null) {
      throw new Error('unautherized');
    }
    const updatedTodo = { ...currentTodo, ...todoUpdateDTO };
    return this.save(updatedTodo);
  }

  async deleteTodo(id: number, userId: string) {
    const currentTodo = await this.createQueryBuilder()
      .select()
      .where(`id = :id AND userId = :userId`, { id, userId })
      .getOne();
    if (currentTodo === null) {
      throw new Error('unautherized');
    }
    return this.softDelete({ id });
  }
}
