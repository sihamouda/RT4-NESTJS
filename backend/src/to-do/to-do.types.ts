import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  createdAt: Date;

  @Column()
  status: StatusEnum;
}
