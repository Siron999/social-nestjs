import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import { User } from "./user.schema";
import { UsersRepository } from "./user.repository";
import {JwtService} from "@nestjs/jwt";
import {CurrentUserDto} from "./dtos/user.dto";
import {Role} from "./roles/roles.enum";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository,private readonly jwtService:JwtService) {}

    async getCurrentUser(email:string): Promise<CurrentUserDto> {
        const user = await this.usersRepository.findOne({email});
        if(!user) throw new UnauthorizedException('Invalid Credentials');
        if (user) {
            return {
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                mobileNo: user.mobileNo,
                education: user.education,
                hobbies: user.hobbies,
                posts: user.posts,
                logs: user.logs,
                address: user.address,
                profileImg: user.profileImg,
            };
        }
        return null;
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(username: string,fullName: string,role: Role, password: string, email: string,mobileNo: number): Promise<User> {
        //hashpassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        return this.usersRepository.create({
            username,
            fullName,
            role,
            email,
            mobileNo,
            password:hashedPassword,
        })
    }

    async accountExists(email: string,username: string): Promise<void> {
        const user= await this.usersRepository.accountExists({$or:[{email},{username}]});
        if(user) throw new BadRequestException('Account already exists');
    }

    async validateUser(email: string, pass: string): Promise<CurrentUserDto & {access_token:string}> {
        const user = await this.usersRepository.findOne({email});
        if(!user) throw new UnauthorizedException('Invalid Credentials');

        const passwordExist = await bcrypt.compare(pass,user.password);
        console.log(passwordExist)

        if (user && passwordExist) {
            return await this.login(user);
        }else {
            throw new UnauthorizedException('Invalid Credentials');
        }
    }

    async login(user: User): Promise<CurrentUserDto & {access_token:string}> {
        const payload = { email: user.email,sub:user._id,roles:user.role };
        return {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            role:user.role,
            mobileNo: user.mobileNo,
            education: user.education,
            hobbies: user.hobbies,
            posts: user.posts,
            logs: user.logs,
            address: user.address,
            profileImg: user.profileImg,
            access_token: this.jwtService.sign(payload),
        };
    }

}