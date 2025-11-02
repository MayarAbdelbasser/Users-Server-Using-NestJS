import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString({ message: 'password must be string' })
  @Length(3, 12)
  password: string;

  @IsOptional()
  @IsNumber()
  age: number;
}
