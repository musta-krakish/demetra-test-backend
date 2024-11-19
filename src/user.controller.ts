import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('get-by-id')
  async getUserById(@Query('id') id: number) {
    return this.userService.getUserById(id);
  }
}
