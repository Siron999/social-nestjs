import { Module } from '@nestjs/common';
import {UsersController} from "./user.controller";
import {UsersService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {UsersRepository} from "./user.repository";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {JwtAuthGuard} from "./strategies/jwt-auth.guard";
import {jwtConfig} from "../config/jwt.config";

console.log(jwtConfig)

@Module({
    imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    JwtModule.register(jwtConfig)
    ],
    controllers: [UsersController],
    providers: [UsersService,UsersRepository,JwtStrategy,JwtAuthGuard],
    exports: [UsersService]
})
export class UserModule {}
