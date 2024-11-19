import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserProcessor } from './user.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    BullModule.registerQueue({
      name: 'userQueue', 
    }),
  ],
  controllers: [UserController], 
  providers: [UserService, UserProcessor],
})
export class UserModule {}
