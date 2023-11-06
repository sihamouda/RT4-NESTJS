import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UUID_PROVIDER') private uuidProvider,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }
  createUser(userDTO: UserDTO) {
    const newUser = this.userRepository.create({
      uuid: this.uuidProvider(),
      ...userDTO,
    } as UserEntity);

    return this.userRepository.save(newUser);
  }
}
