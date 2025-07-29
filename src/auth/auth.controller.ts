import { Body, Controller ,Get,Post} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly auyhService:AuthService){}
    @Get()
    getauth():string{
        return "auth"
    }

    @Post('login')
    async login(@Body()body:{username:string,password:string}){
        return this.auyhService.signup(body.username,body.password)
    }

}
