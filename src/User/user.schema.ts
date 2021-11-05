import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {Schema as schema} from 'mongoose';
import {Role} from "./roles/roles.enum";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({type: schema.Types.ObjectId, required: false})
    _id?: schema.Types.ObjectId;

    @Prop({type: String, required: true})
    username: string;

    @Prop({type: String, required: true})
    fullName: string;

    @Prop({type: String, required: true})
    email: string;

    @Prop({type:String,enum:Role,required: false,default: Role.User})
    role?: Role;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: Number, required: true})
    mobileNo: number;

    @Prop({type: String, default: "", required: false})
    profileImg?: string;

    @Prop({type: String, default: "", required: false})
    address?: string;

    @Prop({type: [{}], required: false})
    education?: Array<object>;

    @Prop({type: [String], required: false})
    hobbies?: Array<string>;

    @Prop({type: [schema.Types.ObjectId], required: false, ref: 'Post'})
    posts?: Array<schema.Types.ObjectId>;

    @Prop({type: [{}], required: false})
    logs?: Array<object>;

    @Prop({type: [schema.Types.ObjectId], required: false, ref: 'User'})
    following?: Array<schema.Types.ObjectId>;

    @Prop({type: [schema.Types.ObjectId], required: false, ref: 'User'})
    followers?: Array<schema.Types.ObjectId>;
}

export const UserSchema = SchemaFactory.createForClass(User);
