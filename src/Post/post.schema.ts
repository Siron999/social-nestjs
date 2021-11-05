import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {Schema as schema} from 'mongoose';
import {Comment} from "./comment.schema";

export type PostDocument = Post & Document;

@Schema()
export class Post {

    @Prop({type: schema.Types.ObjectId, required: false})
    _id?: schema.Types.ObjectId;

    @Prop({type: String, required: true})
    postImg: string;

    @Prop({type: String, required: true})
    caption: string;

    @Prop({type: [String], required: false})
    likes?: Array<String>;

    @Prop({type: [], required: false})
    comments?: Array<Comment>;

}

export const PostSchema = SchemaFactory.createForClass(Post);
