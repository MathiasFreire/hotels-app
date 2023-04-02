import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import {FilesModule} from "../files/files.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Content} from "./content.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [
      SequelizeModule.forFeature([Content]),
      FilesModule,
      AuthModule
  ]
})
export class ContentModule {}
