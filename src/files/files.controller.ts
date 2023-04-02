import {Controller, Get, Post, UseGuards} from "@nestjs/common";
import {FilesService} from "./files.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService) {}

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/delete')
    deleteUseless() {
        this.filesService.deleteUselessFiles();
    }

}