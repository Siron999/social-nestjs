import { Module } from '@nestjs/common';
import {UsersController} from "./user.controller";
import {UsersService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {UsersRepository} from "./user.repository";

@Module({
    imports: [MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    controllers: [UsersController],
    providers: [UsersService,UsersRepository],
})
export class UserModule {}
