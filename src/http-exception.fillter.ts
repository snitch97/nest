import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}

// @Catch()
// export class AllExceptionFilter implements ExceptionFilter {
//     constructor(private readonly httpAdapterHost : HttpAdapterHost){}
//     catch(exception:unknown, host: ArgumentsHost):void{
//         const { httpAdapter } = this.httpAdapterHost;
//         const ctx = host.switchToHttp();
//         const httpStatus =
//           exception instanceof HttpException
//             ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
//         const responseBody = {
//             statusCode: httpStatus,
//             timestamp: new Date().toISOString(),
//             path: httpAdapter.getRequestUrl(ctx.getRequest()),
//         }

//         httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
//     }
// }