// import { Controller, Get, Header, HttpCode, Post, Req, Redirect, Query, Param, HostParam, Body} from '@nestjs/common';
// import { Observable, of } from 'rxjs';
// // import { Request } from 'express';
// import { AppService } from 'src/app.service';

// import { Body, Controller, Delete, Param, Post, Put, Query } from "@nestjs/common";

export class CreateCatDto{
    name: string;
    age: number;
    breed: string;
}

// const Cat = new CreateCatDto();
// Cat.name = "kitty";
// Cat.age = 1;
// Cat.breed = "Pet";

// @Controller('cats')
// export class CatsController {
//     constructor(private readonly appService: AppService){}

//     @Get('admin-info')
//     getAdminInfo():string{
//         return this.appService.getHello();
//     }

//     @Get()
//     // async findAll():Promise<any[]>{
//     //     return [];
//     // }
//     findAll():Observable<any[]>{
//         return of ([]);
//     }

//     @Post()
//     async create(@Body() createCatDto : CreateCatDto) {
//         return Cat;
//     }

//     // @Post()
//     // @HttpCode(204)
//     // @Header('Cache-Control','none')
//     // create(): string{
//     //     return 'This action adds a new cat';
//     // }

//     // @Get()
//     // findAll(@Req() request: Request):string{
//     //     return 'This action returns all cats';
//     // }

//     // @Get()
//     // @Redirect('https://docs.nestjs.com', 302)
//     // getDocs(@Query('version') version){
//     //     if(version && version === '5'){
//     //         return {url: 'https://docs.nestjs.com/v5/'};
//     //     }
//     // }

// //     @Get(':id')
// //     findOne(@Param() params : any): string{
// //         console.log(params.id);
// //         return `This action returns a #${params.id} cat`;
// //         // return AdminController.index();
// //     }
// // }

// // @Controller({host: 'admin.example.com'})
// // export class AdminController{
// //     @Get()
// //     index():string{
// //         return 'Admin page';
// //     }
// //     getInfo(@HostParam('account') account: string){
// //         return account;
// //     }
// }

//  STANDARD WAY OF MANIPULATING RESPONSE

// @Controller('cats')
// export class CatsController{
//     @Post()
//     create(@Body() createCatDto : CreateCatDto){
//         return 'This action adds a new cat';
//     }
//     @Get()
//     findAll(@Query() query: ListAllEntities){
//         return `This action returns all cats (limit : ${query.limit} items)`;
//     }
//     @Get()
//     findOne(@Param('id') id: string){
//         return `This action returns a #${id} cat`;
//     }
//     @Put(':id')
//     update(@Param('id') id: string) {
//         return `This action updates a #${id} cat`;
//     }
//     @Delete(':id')
//     remove(@Param('id') id: string){
//         return `This action removes a #${id} cat`;
//     }
// }

// LIBRARY-SPECIFIC APPROACH
// import { Controller, Get, Post, HttpStatus, Res } from "@nestjs/common";
// import { Response } from "express";

// @Controller('cats')
// export class CatsController{
//     @Post()
//     create(@Res() res: Response){
//         res.status(HttpStatus.CREATED).send();
//     }
//     @Get()
//     findAll(@Res({passthrough: true}) res:Response){
//         res.status(HttpStatus.OK);
//         return [];
//     }
// }

import { Controller, Get, Post, Body, HttpException, HttpStatus, BadRequestException, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/http-exception.fillter';

export class ForbiddenException extends HttpException {
    constructor(){
        super('Forbiden', HttpStatus.FORBIDDEN);
    }
}
@Controller('cats')
export class CatsController {
    constructor(private catsService : CatsService){ }

    // @Post()
    // async create(@Body() createCatDto : CreateCatDto){
    //     this.catsService.create(createCatDto);
    // }
    
    // @UseFilters(new HttpExceptionFilter())
    // async create(@Body() createCatDto: CreateCatDto){
    //     throw new ForbiddenException();
    // }

    // @Get()
    // async findAll(): Promise<Cat[]>{
    //     return this.catsService.findAll();
    // }

    // Throwing standard exceptions
    @Get()
    async findAll(){
        // throw new ForbiddenException();
        throw new BadRequestException('Something bad happened', {cause: new Error(), description:"Some error description"});
    }

    // @Get()
    // async findAll(){
    //     try{
    //         await this.catsService.findAll();
    //     }
    //     catch (error) {
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: 'This is a custom message'
    //         },HttpStatus.FORBIDDEN, {
    //             cause: error
    //         });
    //     }
    // }
}

// Optional provider

// import { Injectable, Optional, Inject } from '@nestjs/common';
// @Injectable()
// export class HttpService<T>{
//     constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T){}
// }

// For example, to set up a filter as controller-scoped, you would do the following:

// @UseFilters(new HttpExceptionFilter())
// export class CatsController {}