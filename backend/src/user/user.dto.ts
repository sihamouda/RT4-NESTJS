import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class UserSignUpDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
export class UserSignInDTO extends OmitType(UserSignUpDTO, ['email'] as const) {
  @IsNotEmpty()
  access_token: string;
}
