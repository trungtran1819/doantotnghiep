import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    try {
      await this.userService.createUser(body);
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong!');
    }
  }
}
