import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles,context.getHandler());
        if(!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return matchRoles(roles, user.roles);
    }
}

function matchRoles(requireRoles:string[],userRoles: string[]): boolean{
    if(!userRoles){
        return false;
    }
    return requireRoles.some(role => userRoles.includes(role));
}