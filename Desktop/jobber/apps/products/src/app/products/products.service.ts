import { Inject, Injectable } from '@nestjs/common';
import { drizzleORM } from '../drizzle/theDrizzleORM';
import {NodePgDatabase} from "drizzle-orm/node-postgres"
import * as productsSchema from "./schema"
import { CategoriesService } from '../categories/categories.service';
@Injectable()
export class ProductsService {

   
    constructor(
        @Inject(drizzleORM)
        private readonly drizzlerORM:NodePgDatabase<typeof productsSchema>,
        private readonly categoriesService:CategoriesService,
        
    ){}


   async createProduct(productObj:Omit<typeof productsSchema.products.$inferSelect,'id'>){

            const categoryObj=await this.categoriesService.findCategoryByName(productObj.category)
            return await this.drizzlerORM.insert(productsSchema.products).values({
                ...productObj,
                price: categoryObj ? productObj.price + categoryObj.charge : productObj.price
            })
    }

}
