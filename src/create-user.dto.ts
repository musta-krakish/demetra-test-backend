import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Елампий Пивопитий', description: 'Имя' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'nemitaya@nuke.africa', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd', description: 'Пароль', minLength: 6 })
  @MinLength(6)
  password: string;
}
