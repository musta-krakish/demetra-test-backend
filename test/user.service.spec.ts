import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should throw an error if email exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({} as User);
    await expect(service.createUser({ name: 'Test', email: 'test@mail.com', password: '123456' }))
      .rejects.toThrow('ERR_USER_EMAIL_EXISTS');
  });
});
