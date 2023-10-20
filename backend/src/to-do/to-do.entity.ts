import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './to-do.enum';
import { CommonAbstractEntity } from 'src/common-module/CommunAbstractEntity/CommunAbstractEntity';

@Entity('todo')
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
