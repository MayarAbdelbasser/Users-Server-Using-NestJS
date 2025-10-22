import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ICreateUser,
  ICreateUserResponse,
  IGetUserByIdResponse,
  IGetUsersResponse,
  IUsers,
} from './users.interface';

@Injectable()
export class UsersService {
  // users array
  private users: IUsers[] = [];
  private id: number = 0;

  //get all users
  getUsers(): IGetUsersResponse {
    return {
      message: 'Users fetched successfully',
      data: this.users,
    };
  }

  //create new user
  createUser(body: ICreateUser): ICreateUserResponse {
    this.id++;
    this.users?.push({ ...body, id: this.id });
    return {
      message: 'User created successfully',
      data: { ...body, id: this.id },
    };
  }

  //get user by id
  getUserById(id: number): IGetUserByIdResponse {
    const user = this.users.find((u) => u.id == id);
    if (!user) {
      throw new HttpException('User Id not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: `User Id fetched successfully`,
      data: user,
    };
  }

  //delete new user
  deleteUser(id: number): void {
    const user = this.users.find((u) => u.id == id);
    if (!user) {
      throw new HttpException('User Id not found', HttpStatus.NOT_FOUND);
    }
    this.users.splice(id - 1, 1);
  }

  //update user
  updateUser(id: number, body: ICreateUser): ICreateUserResponse {
    const user = this.users.find((u) => u.id == id);
    if (!user) {
      throw new HttpException('User Id not found', HttpStatus.NOT_FOUND);
    }
    this.users[id - 1] = { ...body, id: id };
    return { message: 'User updated successfully', data: this.users[id - 1] };
  }
}
