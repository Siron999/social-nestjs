import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({required:true})
    username:string;

    @Prop({required:true})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({required:true})
    mobileNo:string;

    @Prop({default:"",required:false})
    profileImg?:string;

    @Prop({default:"",required:false})
    address?:string;

    @Prop({type:[{}],required:true})
    education?:Array<object>;

    @Prop({type:[String],required:true})
    hobbies?:Array<string>;

    @Prop({type:[{}],required:true})
    posts?:Array<object>;

    @Prop({type:[{}],required:true})
    logs?:Array<object>;
}

export const UserSchema = SchemaFactory.createForClass(User);