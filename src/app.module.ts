import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {ProfileRoles} from "./roles/profile-roles.model";
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import {Content} from "./content/content.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProfileModule } from './profile/profile.module';
import * as path from 'path'
import {Profile} from "./profile/profile.model";

@Module({
    controllers: [], // контроллеры
    providers: [], // логика, используется в разных компонентах
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        ConfigModule.forRoot({ // конфигурация
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, ProfileRoles, Content, Profile],
            autoLoadModels: true // чтобы создавались таблицы по моделям
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ContentModule,
        FilesModule,
        ProfileModule
    ]
})
export class AppModule {}