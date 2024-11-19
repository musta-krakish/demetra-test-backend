import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST, 
      port: 5432,
      username: process.env.DATABASE_USERNAME, 
      password: process.env.DATABASE_PASSWORD, 
      database: process.env.DATABASE_NAME, 
      synchronize: true,
      autoLoadEntities: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
