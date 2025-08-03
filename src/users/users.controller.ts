import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // הרשמה פתוחה לכולם (ללא הגנה)
    @Post('signup')
    async signup(@Body() body) {
        return this.usersService.create(body);
    }

    // רק מפקד יכול לראות את כל המשתמשים
    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.COMMANDER)
    async getall(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }
}