import {IsString} from "class-validator";

export class CreateUserDto {
    // @IsString({message: 'Должно быть строкой'})
    readonly login: string;

    // @IsString({message: 'Должно быть строкой'})
    readonly password: string;
}