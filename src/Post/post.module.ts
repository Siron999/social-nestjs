import { Module } from '@nestjs/common';
import {PostsController} from "./post.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../User/user.schema";
import {Post, PostSchema} from "./post.schema";
import {UserModule} from "../User/user.module";
import {PostService} from "./post.service";
import {PostRepository} from "./post.repository";
import {Comment, CommentSchema} from "./comment.schema";

@Module({
    imports: [MongooseModule.forFeature([{name:Post.name,schema:PostSchema}]),MongooseModule.forFeature([{name:Comment.name,schema:CommentSchema}]),UserModule],
    controllers: [PostsController],
    providers:[PostService,PostRepository]
})
export class PostModule {}
