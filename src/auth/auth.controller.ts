import { Body, Controller ,Get,Post, HttpCode, HttpStatus, Request,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body()body:{username:string,password:string}){
        return this.authService.login(body.username,body.password)
    }

    @UseGuards(AuthGuard)
    @Get()
    getauth():string{
        return "auth"
    }

}
