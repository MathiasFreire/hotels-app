import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {ProfileModule} from "../profile/profile.module";
import {RolesModule} from "../roles/roles.module";
import {FilesModule} from "../files/files.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "../profile/profile.model";
import {User} from "../users/users.model";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
      forwardRef(() => UsersModule), // чтобы предотвратить зацикливание
      forwardRef(() => ProfileModule),
      JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET', // ключ
          signOptions: {
              expiresIn: '24h' // время жизни токена
          }
      })
  ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
