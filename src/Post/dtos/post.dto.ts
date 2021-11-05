import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {Schema} from "mongoose";

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
