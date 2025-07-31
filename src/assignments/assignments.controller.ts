import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import Assignment from './assignments.entity';

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) { }

    @Post()
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
