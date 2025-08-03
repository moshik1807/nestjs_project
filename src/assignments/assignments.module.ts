import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Assignment from './assignments.entity';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment]),
    AuthModule  // מייבא את AuthModule כדי לגשת ל-AuthGuard ו-RolesGuard
  ],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
