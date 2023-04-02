import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../roles/roles.model";
import {ProfileRoles} from "../roles/profile-roles.model";

interface ProfileCreationAttrs { // поля необходимые для создания записи в таблице
    fullName: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    userId: number;
}

@Table({tableName: 'profile'}) // таблица для профилей
export class Profile extends Model<Profile, ProfileCreationAttrs> { // модель профиля
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    fullName: string;

    @Column({type: DataType.STRING})
    phoneNumber: string

    @Column({type: DataType.STRING})
    email: string

    @Column({type: DataType.STRING})
    birthDate: string

    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsToMany(() => Role, () => ProfileRoles)
    roles: Role[];
}