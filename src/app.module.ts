import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./User/user.module";
import { MongooseModule } from '@nestjs/mongoose';
import {APP_FILTER} from "@nestjs/core";
import {HttpErrorFilter} from "./filter/http-error.filter";
import {dbConfig} from "./config/config";
import {JwtAuthGuard} from "./User/jwt/jwt-auth.guard";
import {JwtStrategy} from "./User/jwt/jwt.strategy";
import {PostModule} from "./Post/post.module";

@Module({
  imports: [MongooseModule.forRoot(dbConfig),UserModule,PostModule],
  controllers: [AppController],
  providers: [
      AppService,
      {
        provide:APP_FILTER,
        useClass:HttpErrorFilter
      },
      JwtStrategy,JwtAuthGuard
  ],
})
export class AppModule {}
