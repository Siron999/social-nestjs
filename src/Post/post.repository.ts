import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model, Schema, Types, UpdateQuery} from "mongoose";
import {Post, PostDocument} from "./post.schema";
import {User, UserDocument} from "../User/user.schema";
import {Comment, CommentDocument} from "./comment.schema";

@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>,@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {
    }

    async create(post: any): Promise<Post> {
        const newPost = new this.postModel({_id: new Types.ObjectId(), ...post});
        return newPost.save()
    }

    async createComment(post: any): Promise<Comment> {
        return  new this.commentModel({_id: new Types.ObjectId(), ...post});
    }

    async findByIdAndUpdate(id: Schema.Types.ObjectId, updateQuery: UpdateQuery<CommentDocument>): Promise<Post> {
        return this.postModel.findByIdAndUpdate(id, updateQuery, { new: true, useFindAndModify: false });
    }

    async findById(id:Schema.Types.ObjectId): Promise<Post> {
        return this.postModel.findById(id)
    }
}
