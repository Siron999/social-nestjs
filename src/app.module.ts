import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./User/user.module";
import { MongooseModule } from '@nestjs/mongoose';
import {APP_FILTER} from "@nestjs/core";
import {HttpErrorFilter} from "./filter/http-error.filter";
import {dbConfig} from "./config/config";

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://siron:abcde12345@cluster0.dw0ms.mongodb.net/nest?retryWrites=true&w=majority"),UserModule],
  controllers: [AppController],
  providers: [
      AppService,
      {
        provide:APP_FILTER,
        useClass:HttpErrorFilter
      }
  ],
})
export class AppModule {}
