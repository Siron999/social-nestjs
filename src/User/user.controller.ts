import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {User} from './user.schema';
import {UsersService} from './user.service';
import {CreateUserDto, CurrentUserDto, LoginUserDto} from "./dtos/user.dto";
import {JwtAuthGuard} from './jwt/jwt-auth.guard';
import {Roles} from "./roles/roles.decorator";
import {Role} from "./roles/roles.enum";
import {RolesGuard} from "./roles/roles.guard";
import {Post as PostSchema} from "../Post/post.schema";
import {Post as PostRoute} from "@nestjs/common/decorators/http/request-mapping.decorator";

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }


    @Roles(Role.User, Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('current-user-info')
    async getUser(@Param('userId') userId: string, @Request() req: any): Promise<CurrentUserDto> {
        return this.usersService.getCurrentUser(req.user.email)
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('all-users')
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<CurrentUserDto> {
        await this.usersService.accountExists(createUserDto.email, createUserDto.username);
        const user = await this.usersService.createUser(createUserDto.username, createUserDto.fullName, createUserDto.role, createUserDto.password, createUserDto.email, createUserDto.mobileNo)
        return this.usersService.login(user);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<CurrentUserDto> {
        return this.usersService.validateUser(loginUserDto.email, loginUserDto.password);
    }

    @Roles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @PostRoute('follow')
    async follow(@Body() user: any, @Request() req: any): Promise<String> {
        await this.usersService.userExists(user.id);
        const isFollowed = await this.usersService.isFollowed(user.id, req.user.sub);
        if (!isFollowed) {
            return this.usersService.follow(user.id, req.user.sub);
        } else {
            return this.usersService.unFollow(user.id, req.user.sub);
        }
    }

    @Roles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('feed')
    async feed(@Request() req: any): Promise<Array<PostSchema>> {
        return this.usersService.feed(req.user.sub);
    }

}
