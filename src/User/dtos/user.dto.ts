import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Validate
} from 'class-validator';
import {IsStringOrNumber, MobileLength} from "../../validator/custom.validator";
import {Prop} from "@nestjs/mongoose";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Validate(IsStringOrNumber)
    @Validate(MobileLength)
    mobileNo: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}

export class CurrentUserDto {

    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    fullName:string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    mobileNo:number;

    @IsNotEmpty()
    profileImg?:string;

    @IsNotEmpty()
    address?:string;

    @IsNotEmpty()
    education?:Array<object>;

    @IsNotEmpty()
    hobbies?:Array<string>;

    @IsNotEmpty()
    posts?:Array<object>;

    @IsNotEmpty()
    logs?:Array<object>;

    @IsNotEmpty()
    access_token?:string;
}