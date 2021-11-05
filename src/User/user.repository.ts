import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model, Schema, Types, UpdateQuery} from "mongoose";
import {User, UserDocument} from "./user.schema";
import {CurrentUserDto} from "./dtos/user.dto";
import {Post} from "../Post/post.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async findById(userFilterQuery: Schema.Types.ObjectId, projection: string = ''): Promise<User> {
        if (projection === '') {
            return this.userModel.findById(userFilterQuery);
        } else {
            return this.userModel.findById(userFilterQuery, projection);
        }
    }

    async findOne(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
        return this.userModel.findOne(userFilterQuery).populate('posts').populate('followers','username email profileImg');
    }

    async find(usersFilterQuery: FilterQuery<UserDocument>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery)
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel({_id: new Types.ObjectId(), ...user});
        return newUser.save()
    }

    async accountExists(usersFilterQuery: FilterQuery<UserDocument>): Promise<Boolean> {
        const exists = await this.userModel.findOne(usersFilterQuery);
        return !!exists;
    }

    async findByIdAndUpdate(id: Schema.Types.ObjectId, updateQuery: UpdateQuery<UserDocument>): Promise<CurrentUserDto> {
        return this.userModel.findByIdAndUpdate(id, updateQuery, {new: true, useFindAndModify: false});
    }

    async aggregate(pipeline: any[]): Promise<Array<Post>> {
        return this.userModel.aggregate(pipeline)
    }
}
