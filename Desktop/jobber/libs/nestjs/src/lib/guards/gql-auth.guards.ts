
import { CanActivate, ExecutionContext, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ClientGrpc } from "@nestjs/microservices";
import { catchError, map, Observable, of } from "rxjs";

import  {AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, AuthServiceClient} from "types/proto/auth"



// 👉👉✨ GqlAuthGuard SHOULD ADD TO JOBS MODULE to work
@Injectable()
export class GqlAuthGuard implements CanActivate,OnModuleInit{
    private readonly logger= new Logger(GqlAuthGuard.name) // console logger!!!!
    private authService:AuthServiceClient;
    
    constructor(
         @Inject(AUTH_PACKAGE_NAME)
         private client:ClientGrpc   ////چه کلاینتی ->which microservice? > SENDER
    ){console.log("constructor GqlAuthGuard:lib",AUTH_PACKAGE_NAME)}
    //1. onModuleInit > initializing کلاینت
   onModuleInit() {
      this.logger.log(`onModuleInit GqlAuthGuard:lib? ${!!this.authService}`);
      this.authService=  this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
      this.logger.log(`AuthService initialized? ${!!this.authService}`);
    }
    
    //2.canActivate ->  invoked before resolver(getchAlljobs query) -> access canActivate method which has access to CTX(request)!
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {   
       
        this.logger.log(`canActivate GqlAuthGuard:lib ${!!this.authService}`);
        // access jwt (if exists)
        const token = this.getRequest(context).cookies?.AuthenticationToken;
        if(!token){
            console.log("No Token From Browser:GqlAuthGuard@lib")
            return false // resolver query won't execute
        }
        
        //👉🏻 SEND REQUEST TO AUTH MICROSERVICE(CONTROLLER block) : to verify jwt
        return this.authService.authenticate({token}).pipe(  //pipe on ObservableZ
            map((res)=>{  
                //👉🏻 result is from AUTH CONTROLLER
                this.logger.log("RESULT FROM AUTH CONTROLLER to GqlAuthGuard:lib!",res)
                this.getRequest(context).user = res //🔰 res > userObj
                return true       // return Observable<boolean>
                                  // resolver will execute
            }),
            catchError((err)=>{
                this.logger.error(err) // of make it : observable<false> 
                                       // NOTE: map automatically converts it to Observable<>
                return of(false)  // resolver query won't execute
            })
        );    
    }

    
    //convert REQUEST to gq Context request
    // access request ??  grapgql Context
    private getRequest(context:ExecutionContext){
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req; //why req? app.module > context:({req,res}) => ({req,res})
    }
}