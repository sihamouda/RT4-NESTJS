import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @HttpCode(200)
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  @HttpCode(201)
  postUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }
}
