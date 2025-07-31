// import { Controller, Post, Get, Body, Param } from '@nestjs/common';
// import { AssignmentsService } from './assignments.service';
// import Assignment from './assignments.entity';

// @Controller('assignments')
// export class AssignmentsController {
//     constructor(private readonly assignmentsService: AssignmentsService) { }

//     @Post()
//     async createAssignment(@Body() body): Promise<Assignment> {
//         return this.assignmentsService.addAssignment(body);
//     }

//     @Get(':id')
//     async getAssignmentById(@Param('id') id: number): Promise<Assignment | null> {
//         return this.assignmentsService.getAssignmentById(id);
//     }

//     @Get()
//     async getAllAssignments(): Promise<Assignment[]> {
//         return this.assignmentsService.getAllAssignments();
//     }

//     @Get('/soldier/:soldierId')
//     async getAssignmentsBySoldierId(@Param('soldierId') soldierId: number): Promise<Assignment[]> {
//         return this.assignmentsService.getAssignmentsBySoldierId(soldierId);
//     }

// }

import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import Assignment from './assignments.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('assignments')
@UseGuards(AuthGuard) // כל ה-endpoints דורשים התחברות
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }

    // רק מפקד יכול ליצור שיבוץ חדש
    @Post()
    @UseGuards(RolesGuard)
    @Roles(Role.COMMANDER)
    async createAssignment(@Body() body): Promise<Assignment> {
        return this.assignmentsService.addAssignment(body);
    }

    @Get(':id')
    async getAssignmentById(@Param('id') id: number): Promise<Assignment | null> {
        return this.assignmentsService.getAssignmentById(id);
    }

    @Get()
    async getAllAssignments(): Promise<Assignment[]> {
        return this.assignmentsService.getAllAssignments();
    }

    @Get('/soldier/:soldierId')
    async getAssignmentsBySoldierId(@Param('soldierId') soldierId: number): Promise<Assignment[]> {
        return this.assignmentsService.getAssignmentsBySoldierId(soldierId);
    }
}
