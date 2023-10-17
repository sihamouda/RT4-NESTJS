import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserDTO } from './user.types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    @Get()
    @HttpCode(200)
    getUsers() {
        return this.userService.findUsers()
    }

    @Post()
    @HttpCode(201)
    postUser(@Body() userDTO:UserDTO){
        return this.userService.createUser(userDTO)
    }
}
