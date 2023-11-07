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
import { StatusEnum } from './to-do.enum';
import { TodoDTOForCreating, TodoDTOForUpdating } from './to-do.dto';

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
      return this.todoService.getTodos();
    }
    if (status) {
      if (name && description == undefined) {
        return this.todoService.getTodoByName(status, name);
      }
      if (name == undefined && description) {
        return this.todoService.getTodoByDescription(status, description);
      }
    }
  }

  // pagination
  @Get('/paginate')
  getPage(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 2,
  ) {
    return this.todoService.getTodosPaginated(page, pageSize);
  }

  @Get(':id')
  getTodoById(@Param('id') idTodo: number) {
    return this.todoService.getTodoById(idTodo);
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
