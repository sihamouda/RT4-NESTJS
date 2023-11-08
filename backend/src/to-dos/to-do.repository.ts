import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TODO_TABLE_NAME, TodoEntity } from './to-do.entity';
import { StatusEnum } from './to-do.enum';
import { PaginationOptions } from './to-do.types';
import { Injectable } from '@nestjs/common';

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
      .where(`${TODO_TABLE_NAME}.id = :id`, { id });
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
      .where(
        `${TODO_TABLE_NAME}.status = :status AND ${TODO_TABLE_NAME}.${condition} = :${condition}`,
        { status, [condition]: conditionValue },
      );
    return this.handlePaginationForQueryBuilderSelection(
      todoByCondition,
      paginationOptions,
    );
  }
}
