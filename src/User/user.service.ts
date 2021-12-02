import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {User} from "./user.schema";
import {UsersRepository} from "./user.repository";
import {JwtService} from "@nestjs/jwt";
import {CurrentUserDto} from "./dtos/user.dto";
import {Role} from "./roles/roles.enum";
import * as bcrypt from 'bcrypt';
import {Schema} from "mongoose";
import {Post} from "../Post/post.schema";
import {FeedDto} from "../Post/dtos/post.dto";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService) {
    }

    async getCurrentUser(email: string): Promise<CurrentUserDto> {
        const user = await this.usersRepository.findOne({email});
        if (!user) throw new UnauthorizedException('Invalid Credentials');
        if (user) {
            let temp = user.posts as Array<any>;
            return {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                mobileNo: user.mobileNo,
                role: user.role,
                education: user.education,
                hobbies: user.hobbies,
                posts: temp.map((x) => ({...x.toJSON(), liked: (x.likes.includes(user.username))})),
                logs: user.logs,
                address: user.address,
                profileImg: user.profileImg,
                following: user.following,
                followers: user.followers,
            };
        }
        return null;
    }

    async getUser(userId: Schema.Types.ObjectId, username: string): Promise<CurrentUserDto> {
        const user = await this.usersRepository.findByIdUser(userId);
        if (!user) throw new UnauthorizedException('User Not Found');
        if (user) {
            let temp = user.posts as Array<any>;
            return {
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                mobileNo: user.mobileNo,
                role: user.role,
                education: user.education,
                hobbies: user.hobbies,
                posts: temp.map((x) => ({...x.toJSON(), liked: (x.likes.includes(username))})),
                logs: user.logs,
                address: user.address,
                profileImg: user.profileImg,
                following: user.following,
                followers: user.followers,
            };
        }
        return null;
    }

    async getUsers(username: string): Promise<User[]> {
        return this.usersRepository.findAll({username: {$ne: username}});
    }

    async createUser(username: string, fullName: string, role: Role, password: string, email: string, mobileNo: number): Promise<User> {
        //hashpassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return this.usersRepository.create({
            username,
            fullName,
            role,
            email,
            mobileNo,
            password: hashedPassword,
        })
    }

    async accountExists(email: string, username: string): Promise<void> {
        const user = await this.usersRepository.accountExists({$or: [{email}, {username}]});
        if (user) throw new BadRequestException('Account already exists');
    }

    async userExists(id: Schema.Types.ObjectId): Promise<void> {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new BadRequestException('User not found.');
    }

    async validateUser(email: string, pass: string): Promise<CurrentUserDto & { access_token: string }> {
        const user = await this.usersRepository.findOne({email});
        if (!user) throw new UnauthorizedException('Invalid Credentials');

        const passwordExist = await bcrypt.compare(pass, user.password);

        if (user && passwordExist) {
            return await this.login(user);
        } else {
            throw new UnauthorizedException('Invalid Credentials');
        }
    }

    async login(user: User): Promise<CurrentUserDto & { access_token: string }> {
        const payload = {email: user.email, sub: user._id, role: user.role, username: user.username};
        let temp = user.posts as Array<any>;
        return {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            mobileNo: user.mobileNo,
            education: user.education,
            hobbies: user.hobbies,
            posts: temp.map((x) => ({...x.toJSON(), liked: (x.likes.includes(user.username))})),
            logs: user.logs,
            address: user.address,
            profileImg: user.profileImg,
            following: user.following,
            followers: user.followers,
            access_token: this.jwtService.sign(payload),
        };
    }

    async isFollowed(id: Schema.Types.ObjectId, myId: Schema.Types.ObjectId): Promise<Boolean> {
        const {following} = await this.usersRepository.findById(myId);
        return following.includes(id);
    }


    async follow(id: Schema.Types.ObjectId, myId: Schema.Types.ObjectId): Promise<String> {
        await this.usersRepository.findByIdAndUpdate(myId, {
            $push: {
                following: id
            },
        });

        await this.usersRepository.findByIdAndUpdate(id, {
            $push: {
                followers: myId
            },
        });

        return "Followed"
    }

    async unFollow(id: Schema.Types.ObjectId, myId: Schema.Types.ObjectId): Promise<String> {
        await this.usersRepository.findByIdAndUpdate(myId, {
            $pull: {
                following: id
            },
        });

        await this.usersRepository.findByIdAndUpdate(id, {
            $pull: {
                followers: myId
            },
        });

        return "Unfollowed"
    }

    async feed(id: Schema.Types.ObjectId, username: string): Promise<Array<FeedDto>> {
        const following = await this.usersRepository.findByIdFeed(id);

        let temp = following.map(x => x);

        if (temp.length === 0) {
            return [];
        } else {
            const feed = await this.usersRepository.aggregate([
                {
                    $match: {
                        $or: temp
                    }
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "posts",
                        foreignField: "_id",
                        as: "posts"
                    }
                },
                {$unwind: "$posts"},
                {
                    $project: {
                        _id: "$posts._id",
                        caption: "$posts.caption",
                        postImg: "$posts.postImg",
                        likes: "$posts.likes",
                        comments: "$posts.comments",
                        username: "$username",
                        profileImg: '$profileImg',
                        userId: '$_id',
                    }
                },
            ]);

            return feed.map((x) => ({
                ...x,
                liked: (x.likes.includes(username)),
            }))
        }
    }

    async changeProfile(id: Schema.Types.ObjectId, img: string): Promise<String> {
        await this.usersRepository.findByIdAndUpdate(id, {
            $set: {
                profileImg: img
            },
        });
        return "Profile Pic Successfully changed";
    }
}
