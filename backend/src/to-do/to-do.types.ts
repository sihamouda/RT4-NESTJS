import { IsNotEmpty, MaxLength, MinLength } from '@nestjs/class-validator';
import { Optional } from '@nestjs/common';
import { lengthError } from 'src/common-module/dtoError/dtoError.service';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StatusEnum {
  Todo = 'todo',
  InProgress = 'inprogress',
  Complete = 'complete',
}

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  status: StatusEnum;
}

export class TodoDTOForCreating {
  @IsNotEmpty()
  @MinLength(3, {
    message: lengthError(3),
  })
  @MaxLength(10, {
    message: lengthError(10, false),
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

export class TodoDTOForUpdating {
  @Optional()
  @MinLength(3, {
    message: lengthError(3),
  })
  @MaxLength(10, {
    message: lengthError(10, false),
  })
  name: string;
  @Optional()
  @MinLength(10, {
    message: 'Description is too short',
  })
  description: string;
  @Optional()
  status: StatusEnum;
}
