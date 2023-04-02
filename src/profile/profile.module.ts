import {forwardRef, Module} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import {RolesModule} from "../roles/roles.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";
import {ProfileRoles} from "../roles/profile-roles.model";
import {Profile} from "./profile.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([User, Role, ProfileRoles, Profile]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule)
  ],
  exports: [
      ProfileService
  ]
})
export class ProfileModule {}
