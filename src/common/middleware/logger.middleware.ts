import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// Middleware class has no member, no additional method, and no dependencies.

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware{
//     use(req:Request, res: Response, next: NextFunction){
//         console.log('Request...');
//         next();
//     }
// }

//Functional middleware

export function logger(req: Request, res: Response, next: NextFunction){
    console.log('Request...');
    next();
};