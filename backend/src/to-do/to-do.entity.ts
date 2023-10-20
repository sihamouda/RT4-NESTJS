import { CommonEntity } from 'src/common-module/CommunEntity/CommunEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from './to-do.enum';

@Entity('todo')
export class TodoEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  status: StatusEnum;
}
