import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type {
  ICreateUserResponse,
  IGetUserByIdResponse,
  IGetUsersResponse,
} from './users.interface';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  getUsers(): IGetUsersResponse {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto): ICreateUserResponse {
    return this.userService.createUser(CreateUserDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): IGetUserByIdResponse {
    return this.userService.getUserById(+id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): void {
    this.userService.deleteUser(+id);
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() CreateUserDto: CreateUserDto,
  ): ICreateUserResponse {
    return this.userService.updateUser(+id, CreateUserDto);
  }
}
