// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UsersModule } from 'src/users/users.module';
// import { JwtModule } from '@nestjs/jwt'

// @Module({
//   imports:[UsersModule,
//      JwtModule.register({ 
//       secret: 'yourSecretKey', 
//       signOptions: { expiresIn: '1h' },
//     })
//   ],
//   controllers: [AuthController],
//   providers: [AuthService]
// })
// export class AuthModule {}


// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UsersModule } from 'src/users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { RolesGuard } from './roles.guard';

// @Module({
//   imports: [
//     UsersModule,
//     JwtModule.register({ 
//       secret: process.env.JWT_SECRET || 'yourSecretKey', 
//       signOptions: { expiresIn: '1h' },
//     })
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, RolesGuard],
//   exports: [AuthService, RolesGuard, JwtModule] // מייצא גם את AuthService ו-JwtModule
// })
// export class AuthModule {}

import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule), 
    JwtModule.register({ 
      secret: process.env.JWT_SECRET || 'yourSecretKey', 
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, AuthGuard],
  exports: [AuthService, RolesGuard, AuthGuard, JwtModule] // הוספת AuthGuard לייצוא
})
export class AuthModule {}