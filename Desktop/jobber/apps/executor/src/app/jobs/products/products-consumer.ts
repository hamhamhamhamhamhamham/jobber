import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {  ProductMessage, PulsarClient } from '@jobber/pulsar';
import { PulsarConsumer } from '@jobber/pulsar';
import { PackageName, PRODUCTS_SERVICE_NAME } from "@jobber/grpc"
import { Jobs } from '@jobber/nestjs';
import { ProductsServiceClient } from '@jobber/grpc';
import {ClientGrpc} from "@nestjs/microservices"
import { firstValueFrom } from 'rxjs';
@Injectable()
export class ProductsConsumer extends PulsarConsumer<ProductMessage> implements OnModuleInit {
   // کلاینت
    private productsService:ProductsServiceClient; //🎁1 

    constructor(pulsarClient:PulsarClient,
       @Inject(PackageName.PRODUCTS) private client:ClientGrpc //🎁2
    ){   
            super(pulsarClient,Jobs.PRODUCTS)
    } 
    
        async onModuleInit() {
          this.productsService = this.client.getService<ProductsServiceClient>(PRODUCTS_SERVICE_NAME) //🎁1,2 

          await super.onModuleInit() // as parent onModuleInit execution!
        }
      
      //>PROUCER.SEND(JOBS) to (as backlog) this starts consuming from backlog!
      protected async onMessage(data: ProductMessage): Promise<void> { 
        
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        console.log(data)
        //🎁 call rpc fn tp send request to GRPC SERVER(products)
        // way to await on Observables!
        await firstValueFrom(this.productsService.createProduct(data))
    }
    
}