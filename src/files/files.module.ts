import {Module} from '@nestjs/common';
import {FilesService} from './files.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {File} from "./files.model";
import {FilesController} from "./files.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [FilesService],
    controllers: [FilesController],
    exports: [FilesService],
    imports: [
        SequelizeModule.forFeature([File]),
        AuthModule
    ]
})
export class FilesModule {
}
