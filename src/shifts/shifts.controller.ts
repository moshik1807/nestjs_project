import { Controller, Get, Body, Post ,Param} from '@nestjs/common';
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

    @Get(':id')
    async getShiftById(@Param('id') id: string) {
        return await this.shiftsService.getShiftById(+id);
    }
}
