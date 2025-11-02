import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ICreateUser,
  ICreateUserResponse,
  IGetUserByIdResponse,
  IGetUsersResponse,
} from './users.interface';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  // users array
  private id: number = 0;

  //get all users
  async getUsers(): Promise<IGetUsersResponse> {
    const users = await this.userModel.find();
    return {
      message: 'Users fetched successfully',
      data: users,
    };
  }

  //create new user
  // async createUser(body: ICreateUser): Promise<ICreateUserResponse> {
  //   const user = await this.userModel.create(body);
  //   return {
  //     message: 'User created successfully',
  //     data: user,
  //   };
  // }

  // get user by id
  async getUserById(id: string): Promise<IGetUserByIdResponse> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User Id not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: `User Id fetched successfully`,
      data: user,
    };
  }

  //delete new user
  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new HttpException('User Id not found', HttpStatus.NOT_FOUND);
    }
  }

  // update user
  async updateUser(
    id: string,
    body: ICreateUser,
  ): Promise<ICreateUserResponse> {
    const user = await this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!user) {
      throw new HttpException('User Id not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'User updated successfully', data: user };
  }
}
