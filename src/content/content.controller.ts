import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ContentService} from "./content.service";
import {CreateContentDto} from "./dto/create-content.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {RequestImageDto, RequestObjectDto} from "./dto/request-object.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('content')
export class ContentController {

    constructor(private contentService: ContentService) {}

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateContentDto,
                  @UploadedFile() image) {
        return this.contentService.createContent(dto, image)
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('/content')
    getAll() {
        return this.contentService.getAllContent();
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('/content/:group')
    getByTag(@Param('group') group: string) {
        return this.contentService.getContentByGroup(group);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/delete')
    deleteByTag(@Body() tag: string) {
        return this.contentService.deleteContentByTag(tag);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/updateTag')
    updateSearchTag(@Body() dto: RequestObjectDto) {
        return this.contentService.updateContentSearchTag(dto);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/updateTitle')
    updateTitle(@Body() dto: RequestObjectDto) {
        return this.contentService.updateContentTitle(dto);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/updateText')
    updateText(@Body() dto: RequestObjectDto) {
        return this.contentService.updateContentText(dto);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/updateGroup')
    updateGroup(@Body() dto: RequestObjectDto) {
        return this.contentService.updateContentGroup(dto);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/updateImage')
    updateImage(@Body() dto: RequestImageDto) {
        return this.contentService.updateContentImage(dto);
    }
}
