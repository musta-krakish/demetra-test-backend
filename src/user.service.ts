import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import Redis from 'ioredis';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectQueue('userQueue') private readonly userQueue: Queue,
  ) {
    this.redisClient = new Redis({
      host: 'redis',
      port: 6379,
    });
  }

  async createUser(dto: CreateUserDto) {
    const exists = await this.userRepository.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new BadRequestException('ERR_USER_EMAIL_EXISTS');
    }

    const user = this.userRepository.create(dto);
    await this.userRepository.save(user);

    await this.userQueue.add('activateUser', { userId: user.id }, { delay: 10000 });

    return { statusCode: 201, message: 'SUCCESS', user };
  }

  async getUserById(id: number) {
    const cachedUser = await this.redisClient.get(`user:${id}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('ERR_USER_NOT_FOUND');
    }

    await this.redisClient.set(`user:${id}`, JSON.stringify(user), 'EX', 30 * 60);

    return user;
  }
}
