import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  username: string;

  @Column()
  email: string;
}

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;
}
