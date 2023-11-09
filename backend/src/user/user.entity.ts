import { CommonAbstractEntity } from 'src/common-module/CommunAbstractEntity/CommunAbstractEntity';
import { USER_TABLE_NAME } from 'src/common-module/constants/constants';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity(USER_TABLE_NAME)
export class UserEntity extends CommonAbstractEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
