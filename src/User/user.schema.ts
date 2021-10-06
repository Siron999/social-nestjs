import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';
import {Schema as schema} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{

    @Prop({type:schema.Types.ObjectId,required:false})
    _id?:schema.Types.ObjectId;

    @Prop({type:String,required:true})
    username:string;

    @Prop({type:String,required:true})
    fullName:string;

    @Prop({type:String,required:true})
    email:string;

    @Prop({type:String,required:true})
    password:string;

    @Prop({type:Number,required:true})
    mobileNo:number;

    @Prop({type:String,default:"",required:false})
    profileImg?:string;

    @Prop({type:String,default:"",required:false})
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