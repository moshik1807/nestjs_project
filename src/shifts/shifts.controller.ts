// import { Controller, Get, Body, Post ,Param} from '@nestjs/common';
// import { ShiftsService } from './shifts.service';


// @Controller('shifts')
// export class ShiftsController {
//     constructor(private readonly shiftsService: ShiftsService) { }

//     @Post()
//     async createShift(@Body() body) {
//         return await this.shiftsService.addShift(body);
//     }

//     @Get()
//     async getAllShifts() {
//         return await this.shiftsService.getAllShifts();
//     }

//     @Get(':id')
//     async getShiftById(@Param('id') id: string) {
//         return await this.shiftsService.getShiftById(+id);
//     }
// }

import { Controller, Get, Body, Post, Param, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('shifts')
@UseGuards(AuthGuard) // כל ה-endpoints דורשים התחברות
export class ShiftsController {
    constructor(private readonly shiftsService: ShiftsService) { }

    // רק מפקד יכול ליצור משמרת חדשה
    @Post()
    @UseGuards(RolesGuard)
    @Roles(Role.COMMANDER)
    async createShift(@Body() body) {
        return await this.shiftsService.addShift(body);
    }

    // כל המשתמשים המחוברים יכולים לראות את כל המשמרות
    @Get()
    async getAllShifts() {
        return await this.shiftsService.getAllShifts();
    }

    // כל המשתמשים המחוברים יכולים לראות משמרת ספציפית
    @Get(':id')
    async getShiftById(@Param('id') id: string) {
        return await this.shiftsService.getShiftById(+id);
    }
}