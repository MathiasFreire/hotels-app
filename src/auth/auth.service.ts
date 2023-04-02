import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
import {ProfileService} from "../profile/profile.service";
import {CreateProfileUserDto} from "../profile/dto/create-profile-user.dto";
import {CreateProfileDto} from "../profile/dto/create-profile.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private profileService: ProfileService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(dto: CreateProfileUserDto) {
        const userDto : CreateUserDto = {
            login: dto.login,
            password: dto.password
        };
        const profileDto : CreateProfileDto = {
            fullName: dto.fullName,
            phoneNumber: dto.phoneNumber,
            email: dto.email,
            birthDate: dto.birthDate,
            userId: 1
        }
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5); // хэшируем пароль
        const user = await this.userService.createUser({...userDto, password: hashPassword}); // создаем пользователя
        await this.profileService.createProfile({...profileDto, userId: user.id}); // создаем профиль
        return await this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {login: user.login, id: user.id};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
    }
}
