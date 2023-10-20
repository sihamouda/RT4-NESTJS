import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;
}
