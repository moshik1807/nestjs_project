// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import User from './users.entity'


// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   controllers: [UsersController],
//   providers: [UsersService],
//   exports:[UsersService]
// })
// export class UsersModule {}

// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import User from './users.entity';
// import { AuthModule } from '../auth/auth.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     AuthModule 
//   ],
//   controllers: [UsersController],
//   providers: [UsersService],
//   exports: [UsersService]
// })
// export class UsersModule {}

import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule)  // שימוש ב-forwardRef לפתרון תלות מעגלית
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}