import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model, Schema, Types, UpdateQuery} from "mongoose";
import {User, UserDocument} from "./user.schema";
import {CurrentUserDto} from "./dtos/user.dto";
import {Post} from "../Post/post.schema";
import {FeedDto} from "../Post/dtos/post.dto";

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

    async findByIdUser(userFilterQuery: Schema.Types.ObjectId, projection: string = ''): Promise<User> {
        return this.userModel.findById(userFilterQuery, projection).populate('posts').populate('followers', 'username profileImg').populate('following', 'username profileImg');
    }

    async findByIdFeed(userFilterQuery: Schema.Types.ObjectId, projection: string = ''): Promise<any> {
        const data = await this.userModel.findById(userFilterQuery).populate('following', '_id');
        return data.following
    }


    async findOne(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
        return this.userModel.findOne(userFilterQuery).populate('posts').populate('followers', 'username profileImg').populate('following', 'username profileImg');
    }

    async findOneProfile(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
        return this.userModel.findOne(userFilterQuery,'profileImg');
    }

    async find(usersFilterQuery: FilterQuery<UserDocument>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery)
    }

    async findAll(usersFilterQuery: FilterQuery<UserDocument>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery, 'profileImg username posts').populate('posts')
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

    async aggregate(pipeline: any[]): Promise<Array<FeedDto>> {
        return this.userModel.aggregate(pipeline)
    }
}
