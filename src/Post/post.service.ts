import {BadRequestException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {PostRepository} from "./post.repository";
import {Post} from "./post.schema";
import {Schema} from "mongoose";
import {Comment} from "./comment.schema";
import {UsersRepository} from "../User/user.repository";

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository, private readonly userRepository: UsersRepository, private readonly jwtService: JwtService) {
    }

    async createPost(postImg: string, caption: string): Promise<Post> {
        return this.postRepository.create({
            postImg,
            caption
        })
    }

    async addPostToUser(id: Schema.Types.ObjectId, newPostId: Schema.Types.ObjectId): Promise<String> {
        await this.userRepository.findByIdAndUpdate(id, {
            $push: {
                posts: newPostId
            },
        });
        return "Post Successfully Created";
    }

    async createComment(comment: string, username: string): Promise<Comment> {
        const profile = await this.userRepository.findOneProfile({username});
        return this.postRepository.createComment({
            comment,
            username: username,
            profileImg: profile.profileImg
        })
    }

    async addCommentToUser(id: Schema.Types.ObjectId, newComment: Comment): Promise<String> {
        await this.postRepository.findByIdAndUpdate(id, {
            $push: {
                comments: newComment
            },
        });

        return "Comment Added"
    }

    async isLiked(id: Schema.Types.ObjectId, username: string): Promise<Boolean> {
        const {likes} = await this.postRepository.findById(id);
        return likes.includes(username);
    }


    async addLike(id: Schema.Types.ObjectId, username: string): Promise<String> {
        await this.postRepository.findByIdAndUpdate(id, {
            $push: {
                likes: username
            },
        });

        return "Liked"
    }

    async removeLike(id: Schema.Types.ObjectId, username: string): Promise<String> {
        await this.postRepository.findByIdAndUpdate(id, {
            $pull: {
                likes: username
            },
        });

        return "Disliked"
    }

    async postExists(id: Schema.Types.ObjectId): Promise<void> {
        const post = await this.postRepository.findById(id);
        if (!post) throw new BadRequestException('Post not found.');
    }
}
