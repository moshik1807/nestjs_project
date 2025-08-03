import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
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

    // מפקד רואה הכל, חייל רואה רק את שלו
    @Get()
    async getAllAssignments(@Request() req): Promise<Assignment[]> {
        const user = req.user;
        
        if (user.role === Role.COMMANDER) {
            // מפקד רואה את כל השיבוצים
            return this.assignmentsService.getAllAssignments();
        } else {
            // חייל רואה רק את השיבוצים שלו
            return this.assignmentsService.getAssignmentsBySoldierId(user.sub);
        }
    }

    // מפקד יכול לראות שיבוצים של כל חייל, חייל רק את שלו
    @Get('/soldier/:soldierId')
    async getAssignmentsBySoldierId(
        @Param('soldierId') soldierId: number, 
        @Request() req
    ): Promise<Assignment[]> {
        const user = req.user;
        
        if (user.role === Role.COMMANDER) {
            // מפקד יכול לראות שיבוצים של כל חייל
            return this.assignmentsService.getAssignmentsBySoldierId(soldierId);
        } else {
            // חייל יכול לראות רק את השיבוצים שלו
            if (user.sub !== soldierId) {
                throw new Error('אין לך הרשאה לראות שיבוצים של חייל אחר');
            }
            return this.assignmentsService.getAssignmentsBySoldierId(soldierId);
        }
    }
}