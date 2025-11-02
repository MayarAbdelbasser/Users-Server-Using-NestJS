import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type {
  ICreateUserResponse,
  IGetUserByIdResponse,
  IGetUsersResponse,
} from './users.interface';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  getUsers(): Promise<IGetUsersResponse> {
    return this.userService.getUsers();
  }

  // @Post()
  // createUser(
  //   @Body() CreateUserDto: CreateUserDto,
  // ): Promise<ICreateUserResponse> {
  //   return this.userService.createUser(CreateUserDto);
  // }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<IGetUserByIdResponse> {
    return this.userService.getUserById(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<ICreateUserResponse> {
    return this.userService.updateUser(id, CreateUserDto);
  }
}
