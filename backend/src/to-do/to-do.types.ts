import { IsNotEmpty, MaxLength, MinLength } from '@nestjs/class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum StatusEnum {
  Todo,
  InProgress,
  Complete,
}

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  status: StatusEnum;
}

export class TodoDTO {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(10, {
    message: 'Name is too long',
  })
  name: string;
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Description is too short',
  })
  description: string;
  @IsNotEmpty()
  status: StatusEnum;
}
