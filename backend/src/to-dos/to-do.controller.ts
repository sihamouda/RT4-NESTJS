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
import { TodoDTO, TodoDeleteDto, TodoUptateDTO } from './to-do.dto';

@Controller({
  path: 'to-dos',
  version: '1',
})
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getTodos(
    @Query('name') name: string,
    @Query('description') description: string,
    @Query('status') status: StatusEnum,
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 2,
  ) {
    if (status == undefined && name == undefined && description == undefined) {
      return this.todoService.getTodos({ offset, limit });
    }
    if (status) {
      if (name && description == undefined) {
        return this.todoService.getTodoByCondition(status, 'name', name, {
          offset,
          limit,
        });
      }
      if (name == undefined && description) {
        return this.todoService.getTodoByCondition(
          status,
          'description',
          description,
          { offset, limit },
        );
      }
    }
  }

  @Get(':id')
  getTodoById(@Param('id') idTodo: number) {
    return this.todoService.getTodoById(idTodo, undefined);
  }

  @Post()
  postTodo(@Body() todoDTO: TodoDTO) {
    return this.todoService.createTodo(todoDTO);
  }

  @Patch(':id')
  patchTodo(@Param('id') idTodo: number, @Body() todoDTO: TodoUptateDTO) {
    return this.todoService.updateTodo(idTodo, todoDTO);
  }

  @Delete(':id')
  deleteTodo(@Param('id') idTodo: number, @Body() todoDTO: TodoDeleteDto) {
    return this.todoService.deleteTodo(idTodo, todoDTO.userId);
  }
}
