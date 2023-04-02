import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateContentDto} from "./dto/create-content.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Content} from "./content.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class ContentService {

    constructor(@InjectModel(Content) private contentRepository: typeof Content,
                private fileService: FilesService) {
    }

    async createContent(dto: CreateContentDto, image: any) {
        const fileName = await this.fileService.createFile(image);

        const content = await this.contentRepository.create({...dto, image: fileName})

        await this.fileService.setEssenceTableAndId(fileName, content.id);

        return content;
    }

    async getAllContent() {
        return await this.contentRepository.findAll({include: {all: true}})
    }

    async getContentBySearchTag(searchTag: string) {
        return await this.contentRepository.findOne({where: {searchTag: searchTag}});
    }

    async getContentByGroup(group: string) {
        return await this.contentRepository.findAll({where: {group: group}});
    }

    async deleteContentByTag(searchTag: string) {
        return await Content.destroy({where: {searchTag: searchTag}})
    }

    async updateContentSearchTag(searchTag: string, value: string) {
        try {
            const content = await this.getContentBySearchTag(searchTag);

            return await content.$set('searchTag', [value]);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства searchTag у текстового модуля с тэгом = ${searchTag}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateContentTitle(searchTag: string, value: string) {
        try {
            const content = await this.getContentBySearchTag(searchTag);

            await content.$set('title', value);
            await content.save();
            return content;
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства title у текстового модуля с тэгом = ${searchTag}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateContentText(searchTag: string, value: string) {
        try {
            const content = await this.getContentBySearchTag(searchTag);

            await content.$set('text', [value]);
            await content.save();

            return content;
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства text у текстового модуля с тэгом = ${searchTag}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateContentGroup(searchTag: string, value: string) {
        try {
            const content = await this.getContentBySearchTag(searchTag);

            return await content.$set('group', [value]);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства group у текстового модуля с тэгом = ${searchTag}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateContentImage(searchTag: string, value: any) {
        try {
            const content = await this.getContentBySearchTag(searchTag);

            const oldFileName = content.image;
            await this.fileService.destroyEssenceTableAndId(oldFileName);

            const fileName = await this.fileService.createFile(value);
            await this.fileService.setEssenceTableAndId(fileName, content.id);

            return content;
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства image у текстового модуля с тэгом = ${searchTag}`, HttpStatus.BAD_REQUEST);
        }
    }
}
