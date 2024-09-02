// import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
// import { RolesGuard } from "../guard/roles.guard";
// import { AuthGuard } from "../guard/auth.guard";

// export function Auth(...roles: Role[]){
//     return applyDecorators(
//         SetMetadata('roles', roles),
//         UseGuards(AuthGuard, RolesGuard),
//         // ApiBearerAuth(),
//         // ApiUnauthorizedResponse({description: 'Unauthorized'}),
//     );
// }

// Warning
// The @ApiHideProperty() decorator from the @nestjs/swagger 
// package is not composable and won't work properly with the applyDecorators function.

import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY,true);