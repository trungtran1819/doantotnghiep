import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./user.dto";
import { uuid } from "uuidv4";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  createUser(data: CreateUserDto) {
    const user = this.userRepository.create({
      id: uuid(),
      ...data,
    });

    return this.userRepository.save(user);
  }

  updateUser() {

  }

  deleteUser() {}

  findOneById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  findByUserNameAndPassword(username: string, password: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ username, password });
  }
}