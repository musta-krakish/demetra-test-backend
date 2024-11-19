import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Processor('userQueue')
@Injectable()
export class UserProcessor {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Process('activateUser')
  async handleActivateUser(job: Job<{ userId: number }>) {
    const { userId } = job.data;
    await this.userRepository.update(userId, { status: true });
  }
}
