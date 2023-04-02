import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get('/:login')
    getByLogin(@Param('login') login: string) {
        return this.userService.getUserByLogin(login);
    }

    @Roles('developer')
    @UseGuards(RolesGuard)
    @Get('/users')
    getAll() {
        return this.userService.getAllUsers();
    }
}
