import { IsEmail, IsNotEmpty } from 'class-validator';

export type User = {
    uuid: string,
    username: string,
    email: string
}

export class UserDTO {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;
}
