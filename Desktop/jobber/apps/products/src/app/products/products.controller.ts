import { Controller } from '@nestjs/common';
import {ProductsServiceControllerMethods,ProductsServiceController, CreateProductRequest, CreateProductResponse} from "@jobber/grpc"

import { ProductsService } from './products.service';
import { firstValueFrom, Observable } from 'rxjs';




@Controller('products')
@ProductsServiceControllerMethods() 
export class ProductsController implements ProductsServiceController{
  

 constructor(private readonly productService:ProductsService){}

  async createProduct(request: CreateProductRequest): Promise<CreateProductResponse> {
        console.log("GRPC SERVER : ProductsController")
        await this.productService.createProduct(request);
           
         // CreateProductResponse is empty proto class !
        return {}
   }

}
