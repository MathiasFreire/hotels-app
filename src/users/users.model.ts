import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Profile} from "../profile/profile.model";

interface UserCreationAttrs { // поля необходимые для создания записи в таблице
    login: string;
    password: string;
}

@Table({tableName: 'users'}) // таблица для авторизации
export class User extends Model<User, UserCreationAttrs> { // модель пользователя
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string
}