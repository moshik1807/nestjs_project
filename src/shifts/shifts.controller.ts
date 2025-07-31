import { Controller, Get, Body, Post } from '@nestjs/common';
import { ShiftsService } from './shifts.service';


@Controller('shifts')
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }




    @Post()
    async createShift(@Body() body) {
        return await this.shiftsService.addShift(body);
    }

    @Get()
    async getAllShifts() {
        return await this.shiftsService.getAllShifts();
    }

    @Post('soldierName')
    async getShiftBySoldierNamePost(@Body('soldierName') soldierName: string) {
        return await this.shiftsService.getShiftById(soldierName);
    }


}
