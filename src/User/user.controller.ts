import {Body, Controller, Get, Param, Patch, Post, HttpException, HttpStatus} from '@nestjs/common';
import {User} from './user.schema';
import {UsersService} from './user.service';
import {CreateUserDto} from "./dtos/user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get('current-user-info/:userId')
    async getUser(@Param('userId') userId: string): Promise<User | HttpException> {
            const data = await this.usersService.getUserById(userId);
            if (data) {
                return data;
            } else {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Not Found',
                    message:"User does not exist"
                }, HttpStatus.NOT_FOUND);
            }
    }


    @Get('all-users')
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
        if(await this.usersService.accountExists(createUserDto.email,createUserDto.username)){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Bad Request',
                message:"Account already exists"
            }, HttpStatus.NOT_FOUND);
        }else{
            return this.usersService.createUser(createUserDto.username, createUserDto.password,createUserDto.email,createUserDto.mobileNo)
        }
    }

}