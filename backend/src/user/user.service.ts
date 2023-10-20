import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UuidService } from 'src/common-module/uuid/uuid.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private uuidService: UuidService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }
  createUser(userDTO: UserDTO) {
    const newUser = this.userRepository.create({
      uuid: this.uuidService.generateUuid(),
      ...userDTO,
    } as UserEntity);

    return this.userRepository.save(newUser);
  }
}
