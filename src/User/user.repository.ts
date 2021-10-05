import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findById(userFilterQuery:string): Promise<User> {
        return this.userModel.findById(userFilterQuery);
    }

    async find(usersFilterQuery:FilterQuery<UserDocument>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery)
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }

    async accountExists(usersFilterQuery:FilterQuery<UserDocument>): Promise<Boolean> {
        const exists = await this.userModel.findOne(usersFilterQuery);
        console.log(exists)
        return !!exists;
    }

    async findOneAndUpdate(userFilterQuery:FilterQuery<UserDocument>, user: Partial<User>): Promise<User> {
        return this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }
}