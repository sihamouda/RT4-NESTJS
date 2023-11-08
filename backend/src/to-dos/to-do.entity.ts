import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './to-do.enum';
import { CommonAbstractEntity } from 'src/common-module/CommunAbstractEntity/CommunAbstractEntity';

export const TODO_TABLE_NAME = 'todo';

@Entity(TODO_TABLE_NAME)
export class TodoEntity extends CommonAbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.TODO,
  })
  status: StatusEnum;
}
