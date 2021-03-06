import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Validate
} from 'class-validator';
import {IsStringOrNumber, MobileLength} from "../../validator/custom.validator";
import {Prop} from "@nestjs/mongoose";
import {Role} from "../roles/roles.enum";
import {Schema as schema} from "mongoose";

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

    role?: Role;

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

    _id?: schema.Types.ObjectId;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    email: string;

    role?: Role;

    @IsNotEmpty()
    mobileNo: number;

    @IsNotEmpty()
    profileImg?: string;

    @IsNotEmpty()
    address?: string;

    @IsNotEmpty()
    education?: Array<object>;

    @IsNotEmpty()
    hobbies?: Array<string>;

    @IsNotEmpty()
    posts?: Array<any>;

    @IsNotEmpty()
    logs?: Array<object>;

    @IsNotEmpty()
    access_token?: string;

    @IsNotEmpty()
    following?: Array<object>;

    @IsNotEmpty()
    followers?: Array<object>;
}
