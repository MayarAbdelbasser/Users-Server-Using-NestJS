import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { ICreateUser, ICreateUserResponse } from 'src/users/users.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signup(body: ICreateUser): Promise<ICreateUserResponse> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });
    return {
      message: 'User created successfully',
      data: user,
    };
  }

  async signin(body: ICreateUser): Promise<any> {
    const user = await this.userModel.findOne({ name: body.name });
    if (!user) {
      throw new NotFoundException('User Id not found');
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('User Id not found');
    }
    const payload = { id: user._id, name: user.name };
    const token = await this.jwtService.signAsync(payload);
    return {
      message: 'User signin successfully',
      data: { token },
    };
  }
}
