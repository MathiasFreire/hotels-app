import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {ProfileService} from "./profile.service";
import {CreateProfileDto} from "./dto/create-profile.dto";
import {RequestObjectDto, RequestProfileDto} from "../content/dto/request-object.dto";

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {
    }

    @Post()
    create(@Body() profileDto: CreateProfileDto) {
        return this.profileService.createProfile(profileDto);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Get('/profiles/:id')
    getById(@Param('id') id: number) {
        return this.profileService.getProfileById(id);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Get('/profiles')
    getAll() {
        return this.profileService.getAllProfiles();
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.profileService.addRole(dto);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/delete')
    delete(@Body() id: number) {
        return this.profileService.deleteProfile(id);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/name')
    updateName(@Body() dto: RequestProfileDto) {
        return this.profileService.updateProfileFullName(dto);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/phone')
    updatePhone(@Body() dto: RequestProfileDto) {
        return this.profileService.updateProfilePhoneNumber(dto);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/email')
    updateEmail(@Body() dto: RequestProfileDto) {
        return this.profileService.updateProfileEmail(dto)
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/birthdate')
    updateBirthDate(@Body() dto: RequestProfileDto) {
        return this.profileService.updateProfileBirthDate(dto);
    }
}
