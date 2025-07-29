import { Controller ,Get} from '@nestjs/common';

@Controller('shifts')
export class ShiftsController {
    @Get()
    getghifts():string[]{
        return ["משימה 1","משימה 2"]
    }
}
