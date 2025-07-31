import { Injectable } from '@nestjs/common';
import Assignment from './assignments.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AssignmentsService {
    constructor(
        @InjectRepository(Assignment)
        private readonly assignmentRepository: Repository<Assignment>,
    ) { }

    async addAssignment(data: Partial<Assignment>): Promise<Assignment> {
        const assignment = this.assignmentRepository.create(data);
        return this.assignmentRepository.save(assignment);
    }

    async getAllAssignments(): Promise<Assignment[]> {
        return this.assignmentRepository.find({
            relations: ['shift', 'user'],
        });
    }

    async getAssignmentById(id: number): Promise<Assignment | null> {
        return this.assignmentRepository.findOne({
            where: { id },
            relations: ['shift', 'user'],
        });
    }

    async getAssignmentsBySoldierId(soldierId: number): Promise<Assignment[]> {
        return this.assignmentRepository.find({
            where: { soldierId },
            relations: ['shift', 'user'],
        });
    }

}
