import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUpDTO } from './user.dto';

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
  signUpUser(userSignUpDTO: UserSignUpDTO) {
    const newUser = this.userRepository.create({
      uuid: this.uuidProvider(),
      ...userSignUpDTO,
    } as UserEntity);

    return this.userRepository.save(newUser);
  }

  // signInUser(userSignInDTO: UserSignInDTO) {
  //   console.log(userSignInDTO.access_token);
  //   this.userRepository.find({
  //     where: {
  //       username: userSignInDTO.username,
  //       password: userSignInDTO.password,
  //     },
  //   });
  // }
}
