import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {CreateProfileUserDto} from "../profile/dto/create-profile-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() dto: CreateProfileUserDto) {
        return this.authService.registration(dto);
    }
}
