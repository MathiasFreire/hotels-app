import {Column, DataType, Model, Table} from "sequelize-typescript";

interface FileCreationAttrs { // поля необходимые для создания записи в таблице
    image: string;
    essenceTable: string;
    essenceId: number;
}

@Table({tableName: 'files'}) // таблица для текстовых модулей
export class File extends Model<File, FileCreationAttrs> { // модель текстового модуля
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    image: string

    @Column({type: DataType.STRING})
    essenceTable: string;

    @Column({type: DataType.INTEGER})
    essenceId: string;
}