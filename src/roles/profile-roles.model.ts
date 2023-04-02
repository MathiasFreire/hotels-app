import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Role} from "./roles.model";
import {Profile} from "../profile/profile.model";

@Table({tableName: 'profile_roles', createdAt: false, updatedAt: false}) // таблица для авторизации
export class ProfileRoles extends Model<ProfileRoles> { // модель пользователя
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Profile)
    @Column({type: DataType.INTEGER})
    profileId: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number
}