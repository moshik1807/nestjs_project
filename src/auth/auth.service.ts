import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async signup(
        username:string,
        password:string
    ):Promise<{token:string}>{
        const user = await this.userService.checkUser(username,password)

        if(!user){
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload = {sub:user.id,username:user.username}
        return{token:await this.jwtService.signAsync(payload)}
    }
}
