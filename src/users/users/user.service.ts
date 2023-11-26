import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from '../auth/dto/auth-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto).save();
    return newUser;
  }

  async getUserFromDB(user: AuthUserDto): Promise<User> {
    const existingUser = this.userModel
      .findOne({ email: user.email, password: user.password })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`Пользователь не найден в БД.`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    if (users.length == 0) {
      throw new NotFoundException(`Пользователей нет.`);
    }
    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id, {
      surname: 1,
      name: 1,
      _id: 0,
    });
    if (!user) {
      throw new NotFoundException(`Пользователь не найден.`);
    }
    return user;
  }

  async removeUser(id: string): Promise<User> {
    const removedUser = this.userModel.findByIdAndDelete(id);
    return removedUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`Пользователь не найден`);
    }
    return updatedUser;
  }
}

// async updateUser(
//   userId: string,
//   updateUserDto: UpdateUserDto,
// ): Promise<User> {
//   const existingUser = this.userModel.findByIdAndUpdate(
//     userId,
//     updateUserDto,
//     { new: true },
//   );
//   if (!existingUser) {
//     throw new NotFoundException(`User #${userId} not found`);
//   }
//   return existingUser;
// }

// async getAllUsers(): Promise<User[]> {
//   const userData = await this.userModel.find();
//   if (!userData || userData.length == 0) {
//     throw new NotFoundException('Users data not found!');
//   }
//   return userData;
// }

// async getUser(userId: string): Promise<User> {
//   const existingUser = this.userModel.findById(userId).exec();
//   if (!existingUser) {
//     throw new NotFoundException(`User #${userId} not found`);
//   }
//   return existingUser;
// }

// async deleteUser(userId: string): Promise<User> {
//   const deletedUser = this.userModel.findByIdAndDelete(userId);
//   if (!deletedUser) {
//     throw new NotFoundException(`User #${userId} not found`);
//   }
//   return deletedUser;
// }
