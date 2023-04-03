import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {ProfileService} from "./profile.service";
import {CreateProfileDto} from "./dto/create-profile.dto";

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
    updateName(@Body() id: number, fullName: string) {
        return this.profileService.updateProfileFullName(id, fullName);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/phone')
    updatePhone(@Body() id: number, phone: string) {
        return this.profileService.updateProfilePhoneNumber(id, phone);
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/email')
    updateEmail(@Body() id: number, email: string) {
        return this.profileService.updateProfileEmail(id, email)
    }

    @Roles('admin', 'developer')
    @UseGuards(RolesGuard)
    @Post('/birthdate')
    updateBirthDate(@Body() id: number, birthDate: string) {
        return this.profileService.updateProfileBirthDate(id, birthDate);
    }
}
