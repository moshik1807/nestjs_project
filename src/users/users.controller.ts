import { Controller ,Get,Body, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import User from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post('signup')
    async signup(@Body()body){
        return this.usersService.create(body)
    }

    @Get()
    async getall():Promise<User[]>{
        return this.usersService.getAllUsers()
    }
}
