import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  uuid: string;
  username: string;
  email: string;
}

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;
}
