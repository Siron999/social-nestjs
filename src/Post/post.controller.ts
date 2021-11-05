import {Body, Controller, Get, Post as PostRoute, Request, UseGuards} from "@nestjs/common";
import {Model, ObjectId, Schema, Types} from "mongoose";
import {UsersService} from "../User/user.service";
import {PostService} from "./post.service";
import {CreateUserDto, CurrentUserDto} from "../User/dtos/user.dto";
import {CreateCommentDto, CreatePostDto} from "./dtos/post.dto";
import {Roles} from "../User/roles/roles.decorator";
import {Role} from "../User/roles/roles.enum";
import {JwtAuthGuard} from "../User/jwt/jwt-auth.guard";
import {RolesGuard} from "../User/roles/roles.guard";
import {Post} from "./post.schema";
import {Comment} from "./comment.schema";

@Controller('api')
export class PostsController {
    constructor(private readonly postService: PostService) {
    }

    @Roles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @PostRoute('posts/create')
    async createPost(@Body() createPostDto: CreatePostDto, @Request() req: any): Promise<String> {
        const newPost = await this.postService.createPost(createPostDto.postImg, createPostDto.caption);
        return this.postService.addPostToUser(req.user.sub, newPost._id);
    }

    @Roles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @PostRoute('posts/comment')
    async comment(@Body() comment: CreateCommentDto, @Request() req: any): Promise<String> {
        await this.postService.postExists(comment.postId);
        const newComment = await this.postService.createComment(comment.comment, req.user.username);
        return this.postService.addCommentToUser(comment.postId, newComment);
    }

    @Roles(Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @PostRoute('posts/like')
    async like(@Body() post: any, @Request() req: any): Promise<String> {
        await this.postService.postExists(post.postId);
        const isLiked = await this.postService.isLiked(post.postId, req.user.username);
        if (!isLiked) {
            return this.postService.addLike(post.postId, req.user.username);
        } else {
            return this.postService.removeLike(post.postId, req.user.username);
        }
    }

    // @Get('posts')
    // async getAllPost() {
    //     let posts: ObjectId[] = [];
    //     return this.userModel.aggregate([
    //         {
    //             $match: {
    //                 $or:[{username:'user9'},{username:'Random'},]
    //             }
    //         },
    //         {
    //             $lookup: {
    //                 from: "posts",
    //                 localField: "posts",
    //                 foreignField: "_id",
    //                 as: "posts"
    //             }
    //         },
    //         { $unwind: "$posts" },
    //         {
    //             $project: {
    //                 _id:"$posts._id",
    //                 caption:"$posts.caption",
    //                 postImg:"$posts.postImg",
    //                 username:"$username"
    //             }
    //         }
    //     ])
    // }
}
