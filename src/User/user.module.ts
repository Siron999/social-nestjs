import { Module } from '@nestjs/common';
import {UsersController} from "./user.controller";
import {UsersService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {UsersRepository} from "./user.repository";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";
import {jwtConfig} from "../config/config";
import {RolesGuard} from "./roles/roles.guard";

@Module({
    imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.TOKEN,
                signOptions: { expiresIn: '3600s' },
            }),
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService,UsersRepository]
})
export class UserModule {}
