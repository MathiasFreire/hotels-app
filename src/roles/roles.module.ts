import {forwardRef, Module} from '@nestjs/common';
import {RolesController} from './roles.controller';
import {RolesService} from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {ProfileRoles} from "./profile-roles.model";
import {AuthModule} from "../auth/auth.module";
import {ProfileModule} from "../profile/profile.module";
import {Profile} from "../profile/profile.model";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        SequelizeModule.forFeature([Role, Profile, ProfileRoles]),
        forwardRef(() => AuthModule),
        forwardRef(() => ProfileModule)
    ],
    exports: [
        RolesService
    ]
})
export class RolesModule {
}
