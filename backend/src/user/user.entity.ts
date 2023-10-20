import { CommonAbstractEntity } from 'src/common-module/CommunAbstractEntity/CommunAbstractEntity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends CommonAbstractEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  username: string;

  @Column()
  email: string;
}
