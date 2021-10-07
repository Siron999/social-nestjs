import {Controller, Get, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../User/jwt/jwt-auth.guard";
import {Roles} from "../User/roles/roles.decorator";
import {Role} from "../User/roles/roles.enum";
import {RolesGuard} from "../User/roles/roles.guard";


@Controller('api')
export class PostsController {

    @Roles(Role.User)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('posts')
    getAllPosts(){
        return ["a","b"]
    }
}