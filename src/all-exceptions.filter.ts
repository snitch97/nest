import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        super.catch(exception, host);
    }
}