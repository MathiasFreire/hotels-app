import {Column, DataType, Model, Table} from "sequelize-typescript";

interface ContentCreationAttrs { // поля необходимые для создания записи в таблице
    searchTag: string;
    title: string;
    text: string;
    image: string;
    group: string;
}

@Table({tableName: 'content'}) // таблица для текстовых модулей
export class Content extends Model<Content, ContentCreationAttrs> { // модель текстового модуля
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    searchTag: string

    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.STRING})
    text: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.STRING, allowNull: false})
    group: string;
}