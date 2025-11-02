import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/create-user.dto';
import { ICreateUserResponse } from 'src/users/users.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() CreateUserDto: CreateUserDto): Promise<ICreateUserResponse> {
    return this.authService.signup(CreateUserDto);
  }
  @Post('signin')
  signin(@Body() CreateUserDto: CreateUserDto): Promise<ICreateUserResponse> {
    return this.authService.signin(CreateUserDto);
  }
}
