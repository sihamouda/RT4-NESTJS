import { Injectable } from '@nestjs/common';
import { User, UserDTO } from './user.types';
import { UuidService } from 'src/common-module/uuid/uuid.service';

const users: User[] = [];

@Injectable()
export class UserService {
  constructor(private uuidService: UuidService) {}
  findUsers(): User[] {
    return users;
  }
  createUser(userDTO: UserDTO): User {
    const newUser: User = { ...userDTO, uuid: this.uuidService.generateUuid() };
    users.push(newUser);
    return newUser;
  }
}
