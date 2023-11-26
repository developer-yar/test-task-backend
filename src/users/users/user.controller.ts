import {
  Controller,
  UseGuards,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/users')
  async getUsers(): Promise<User[]> {
    const users = this.userService.getAllUsers();
    return users;
  }

  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userService.createUser(createUserDto);
    return newUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/users/update')
  async updateUser(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = this.userService.updateUser(id, updateUserDto);
    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/users/remove')
  async removeUser(@Param('id') id): Promise<User> {
    const user = this.userService.removeUser(id);
    return user;
  }
}
