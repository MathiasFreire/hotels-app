import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ProfileRoles} from "./profile-roles.model";
import {Profile} from "../profile/profile.model";

interface RoleCreationAttrs { // поля необходимые для создания записи в таблице
    value: string;
    description: string;
}

@Table({tableName: 'roles', createdAt: false, updatedAt: false}) // таблица для авторизации
export class Role extends Model<Role, RoleCreationAttrs> { // модель пользователя
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING})
    description: string

    @BelongsToMany(() => Profile, () => ProfileRoles)
    profiles: Profile[];
}