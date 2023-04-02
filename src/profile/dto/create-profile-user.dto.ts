export class CreateProfileUserDto {
    readonly login: string;
    readonly password: string;
    readonly fullName: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly birthDate: string;
    readonly userId: number;
}