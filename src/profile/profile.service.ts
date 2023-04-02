import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateProfileDto} from "./dto/create-profile.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private roleService: RolesService) {}
    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create(dto);
        let role = await this.roleService.getRoleByValue('user');
        if (!role) {
            await this.roleService.createRole({value: 'user', description: 'пользователь'})
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

    async updateProfileFullName(id: number, value: string) {
        try {
            const profile = await this.getProfileById(id);
            return await profile.$set('fullName', [value]);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства FullName у профиля с id = ${id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProfilePhoneNumber(id: number, value: string) {
        try {
            const profile = await this.getProfileById(id);
            return await profile.$set('phoneNumber', [value]);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства phoneNumber у профиля с id = ${id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProfileEmail(id: number, value: string) {
        try {
            const profile = await this.getProfileById(id);
            return await profile.$set('email', [value]);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства email у профиля с id = ${id}`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateProfileBirthDate(id: number, value: string) {
        try {
            const profile = await this.getProfileById(id);
            return await profile.$set('birthDate', [value]);
        } catch (e) {
            throw new HttpException(`Ошибка при изменении свойства birthDate у профиля с id = ${id}`, HttpStatus.BAD_REQUEST);
        }
    }
}
