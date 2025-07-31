import { Injectable ,NotFoundException} from '@nestjs/common';
import Shift from './shifts.entity';

@Injectable()
export class ShiftsService {
    //יוצר משימה
    async addShift(body) {
        const shift = new Shift()
        shift.startTime = body.startTime
        shift.endTime = body.endTime
        shift.location = body.location
        return await shift.save()
    }

    //קבלת כל המשימות
    async getAllShifts() {
        return await Shift.find();
    }

    //קבלת משימה לפי id
    async getShiftById(id: number) {
        const shift = await Shift.findOne({ where: { id } });
        if (!shift) throw new NotFoundException('Shift not found');
        return shift
    }
}

