import { Inject, Injectable } from '@nestjs/common';
import { drizzleORM } from '../drizzle/theDrizzleORM';
import {NodePgDatabase} from "drizzle-orm/node-postgres"
import * as categoriesSchema from "./schema"
import { eq } from 'drizzle-orm';
@Injectable()
export class CategoriesService {


    constructor(
        @Inject(drizzleORM)
        private readonly drizzlerORM:NodePgDatabase<typeof categoriesSchema>
    ){}


   findCategoryByName(name:string){
    return this.drizzlerORM.query.categories.findFirst({
        where:eq(categoriesSchema.categories.name,name)
     })
   }



}
