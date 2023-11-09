import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDTO } from './user.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post('signup')
  @HttpCode(201)
  signUpUser(@Body() userSignUpDTO: UserSignUpDTO) {
    return this.userService.signUpUser(userSignUpDTO);
  }

  // @Post('signin')
  // signInUser(@Body() userSignInDTO: UserSignInDTO) {
  //   return this.userService.signInUser(userSignInDTO);
  // }
}
