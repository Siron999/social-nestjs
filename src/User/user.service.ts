import { Injectable } from "@nestjs/common";
import { User } from "./user.schema";
import { UsersRepository } from "./user.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.findById(userId)
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(username: string, password: string, email: string,mobileNo: string): Promise<User> {
        return this.usersRepository.create({
            username,
            email,
            mobileNo,
            password,
        })
    }

    async accountExists(email: string,username: string): Promise<Boolean> {
        return this.usersRepository.accountExists({$or:[{email},{username}]});
    }

}