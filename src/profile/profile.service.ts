import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateProfileDto} from "./dto/create-profile.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {Role} from "../roles/roles.model";
import {RequestProfileDto} from "../content/dto/request-object.dto";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private roleService: RolesService) {}
    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create(dto);
        let role: Role;
        try {
            role = await this.roleService.getRoleByValue('user');
        } catch (e) {
            await this.roleService.createRole({value: 'user', description: 'пользователь'});
            throw new HttpException('Пожалуйста, повторите попытку', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        await profile.$set('roles', [role.id]);
        await profile.save();
        profile.roles = [role];
        return profile;
    }
    async getAllProfiles() {
        return await this.profileRepository.findAll({include: {all: true}});
    }

    async getProfileById(id: number) {
        return await this.profileRepository.findOne({where: {id: id}, include: {all: true}});
    }

    async addRole(dto: AddRoleDto) {
        const profile = await this.profileRepository.findByPk(dto.profileId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if (role && profile) {
            await profile.$add('role', role.id); // добавляем значение к массиву
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async deleteProfile(id: number) {
        return await Profile.destroy({where: {id: id}});
    }

    async updateProfileFullName(dto: RequestProfileDto) {
        try {
            const profile = await this.getProfileById(dto.id);
            return await profile.set('fullName', dto.value);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства FullName у профиля с id = ${dto.id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProfilePhoneNumber(dto: RequestProfileDto) {
        try {
            const profile = await this.getProfileById(dto.id);
            return await profile.set('phoneNumber', dto.value);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства phoneNumber у профиля с id = ${dto.id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProfileEmail(dto: RequestProfileDto) {
        try {
            const profile = await this.getProfileById(dto.id);
            return await profile.set('email', dto.value);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства email у профиля с id = ${dto.id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProfileBirthDate(dto: RequestProfileDto) {
        try {
            const profile = await this.getProfileById(dto.id);
            return await profile.set('birthDate', dto.value);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства birthDate у профиля с id = ${dto.id}`, HttpStatus.BAD_REQUEST);
        }
    }
}
