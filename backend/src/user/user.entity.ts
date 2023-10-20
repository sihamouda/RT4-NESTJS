import { CommonEntity } from 'src/common-module/CommunEntity/CommunEntity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  username: string;

  @Column()
  email: string;
}
