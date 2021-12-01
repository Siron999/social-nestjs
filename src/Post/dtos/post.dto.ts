import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {Schema as schema, Schema} from "mongoose";
import {Prop} from "@nestjs/mongoose";
import {Comment} from "../comment.schema";

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    postImg: string;

    @IsNotEmpty()
    @IsString()
    caption: string;

}

export class CreateCommentDto {

    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    postId: Schema.Types.ObjectId;

}

export class FeedDto {

    @IsNotEmpty()
    _id?: schema.Types.ObjectId;

    @IsNotEmpty()
    postImg: string;

    @IsNotEmpty()
    caption: string;

    @IsNotEmpty()
    likes?: Array<String>;

    @IsNotEmpty()
    comments?: Array<Comment>;

    @IsNotEmpty()
    username?: string;

    @IsNotEmpty()
    profileImg?: string;

}
