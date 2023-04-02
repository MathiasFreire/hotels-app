import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'
import {InjectModel} from "@nestjs/sequelize";
import {File} from "./files.model";

@Injectable()
export class FilesService {

    constructor(@InjectModel(File) private filesRepository: typeof File) {
    }

    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async setEssenceTableAndId(fileName: string, id: number) {

        let count = 1;

        const errStr = new Error().stack.split('\n')[2].split(' ')[5].split('.')[0].split('')
        for (let i = 1; i < errStr.length; i++) {
            if (errStr[i].toLowerCase() !== errStr[i]) break;
            else count++;
        }

        const caller = errStr.slice(0, count).join('').toLowerCase();

        return await File.create({image: fileName, essenceTable: caller, essenceId: id})
    }

    async destroyEssenceTableAndId(fileName: string) {
        const file = await this.filesRepository.findOne({where: {image: fileName}});
        await file.$set('essenceTable', null);
        await file.$set('essenceId', null);
        await file.save();
        return file;
    }

    async deleteUselessFiles() {
        const files = fs.readdirSync(path.resolve(__dirname, '..', 'static'));
        for (let file of files) {
            await this.deleteFileIfUseless(file);
        }
    }

    async deleteFileIfUseless(fileName: string) {
        try {
        const file = await this.filesRepository.findOne({where: {image: fileName}});

        if ((!file || !file.essenceId || !file.essenceTable) && Date.now() - file.updatedAt >= 3600000) {
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
            fs.unlinkSync(filePath);
        }
    } catch (e) {
            throw new HttpException('Ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
