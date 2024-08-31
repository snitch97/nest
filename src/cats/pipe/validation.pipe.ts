import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
// Class Validate

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if(!metatype || !this.toValidate(metatype)){
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if(errors.length > 0){
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Function):boolean{
        const types : Function[] = [String, Number, Boolean, Array, Object];
        return !types.includes(metatype);
    }
}

export class ZodValidationPipe implements PipeTransform{
    constructor(private schema:ZodSchema){}
    
    transform(value: unknown, metadata: ArgumentMetadata) {
        try{
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        }catch(error){
            throw new BadRequestException('Validation failed');
        }
    }
}