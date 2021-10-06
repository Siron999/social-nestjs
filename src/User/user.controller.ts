import {Body, Controller, Get, Param, Patch, Post, HttpException, HttpStatus, UseGuards,Request} from '@nestjs/common';
import {User} from './user.schema';
import {UsersService} from './user.service';
import {CreateUserDto, CurrentUserDto, LoginUserDto} from "./dtos/user.dto";
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('current-user-info')
    async getUser(@Param('userId') userId: string,@Request()req:any): Promise<CurrentUserDto> {
        return this.usersService.getCurrentUser(req.user.email)
    }

    @UseGuards(JwtAuthGuard)
    @Get('all-users')
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<CurrentUserDto> {
        await this.usersService.accountExists(createUserDto.email,createUserDto.username);
        const user = await this.usersService.createUser(createUserDto.username,createUserDto.fullName, createUserDto.password,createUserDto.email,createUserDto.mobileNo)
        return this.login(user);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<CurrentUserDto> {
        return this.usersService.validateUser(loginUserDto.email,loginUserDto.password);
    }

}