import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate{

    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization();
            const bearer = authHeader.split(' ')[0]; // тип токена
            const token = authHeader.split(' ')[1]; // токен

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            req.user = this.jwtService.verify(token); // раскодировка токена
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'});
        }
    }

}