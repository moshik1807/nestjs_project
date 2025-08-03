// import { Module } from '@nestjs/common';
// import { ShiftsController } from './shifts.controller';
// import { ShiftsService } from './shifts.service';
// import Shift from './shifts.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';


// @Module({
//   imports: [TypeOrmModule.forFeature([Shift])],
//   controllers: [ShiftsController],
//   providers: [ShiftsService],
//   exports:[ShiftsService]
// })
// export class ShiftsModule {}

import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import Shift from './shifts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shift]),
    AuthModule 
  ],
  controllers: [ShiftsController],
  providers: [ShiftsService],
  exports: [ShiftsService]
})
export class ShiftsModule {}
