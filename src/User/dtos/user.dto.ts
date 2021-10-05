import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    Validate
} from 'class-validator';
import {IsStringOrNumber, MobileLength} from "../../validator/custom.validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Validate(IsStringOrNumber)
    @Validate(MobileLength)
    mobileNo: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}