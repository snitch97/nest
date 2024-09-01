// import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
// import { Observable } from "rxjs";

// export class validateRequest(@Req() request: Request) : string{ }

// @Injectable()
// export class AuthGuard implements CanActivate {
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const request = context.switchToHttp().getRequest();
//         return validateRequest(request);
//     }
// }