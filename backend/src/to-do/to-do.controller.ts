import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './to-do.service';
import {
  StatusEnum,
  TodoDTOForCreating,
  TodoDTOForUpdating,
} from './to-do.types';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(
    @Query('name') name: string,
    @Query('description') description: string,
    @Query('status') status: StatusEnum,
  ) {
    if (status == undefined && name == undefined && description == undefined) {
      return this.todoService.findTodos();
    }
    return this.todoService.findTodoByCondition(status, name, description);
  }

  @Get(':id')
  getTodoById(@Param('id') idTodo: number) {
    return this.todoService.findTodoById(idTodo);
  }

  @Post()
  postTodo(@Body() todoDTO: TodoDTOForCreating) {
    return this.todoService.createTodo(todoDTO);
  }

  @Patch(':id')
  patchTodo(@Param('id') idTodo: number, @Body() todoDTO: TodoDTOForUpdating) {
    return this.todoService.updateTodo(idTodo, todoDTO);
  }

  @Delete(':id')
  deleteTodo(@Param('id') idTodo: number) {
    return this.todoService.deleteTodo(idTodo);
  }
}
