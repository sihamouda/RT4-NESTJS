import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './to-do.service';
import { TodoDTO } from './to-do.types';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos() {
    return this.todoService.findTodos();
  }

  @Post()
  postTodo(@Body() todoDTO: TodoDTO) {
    return this.todoService.createTodo(todoDTO);
  }
}
