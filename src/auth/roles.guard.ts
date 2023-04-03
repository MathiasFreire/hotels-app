import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";
import {Profile} from "../profile/profile.model";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]; // тип токена
            const token = authHeader.split(' ')[1]; // токен

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const user = this.jwtService.verify(token); // раскодировка токена
            const profile: Profile = await Profile.findOne({where: {userId: user.id}, include: {all: true}});

            req.profile = profile;

            // проверка наличия у пользователя необходимых прав
            return profile.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN);
        }
    }

}