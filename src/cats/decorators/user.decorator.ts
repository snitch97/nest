import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Sample
// export const User = createParamDecorator(
//     (data: unknown, ctx: ExecutionContext) => {
//         const request = ctx.switchToHttp().getRequest();
//         return request.user;
//     }
// )

// Then, you can simply use it wherever it fits your requirements:

// @Get()
// async findOne(@User() user:UserEntity){
//      console.log(user);
// }

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user ?.[data] : user;
    }
)

// Then access a particular property via the @User() decorator in the controller:

// @Get()
// async findOne(@User('firstName') firstName: string){
//      console.log(`Hello ${firstName}`);
// }

// Working with pipes

// @Get()
// async findOne(
//      @User(new ValidationPipe({validateCustomDecorators: true}))
//      user: UserEntity,
// ){
//      console.log(user);
// }