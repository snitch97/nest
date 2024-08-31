import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat){
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id:number){
        const cat = this.cats.at(id-1);
        if(!cat){
            throw new NotFoundException(`${id}th Cat not found`);
        }
        return cat;
    }
}
