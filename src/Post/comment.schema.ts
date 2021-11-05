import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {Schema as schema} from 'mongoose';
import {User} from "../User/user.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {

    @Prop({type: schema.Types.ObjectId, required: false})
    _id?: schema.Types.ObjectId;

    @Prop({type: String, required: true})
    comment: string;

    @Prop({required: true,ref:'User'})
    user: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
