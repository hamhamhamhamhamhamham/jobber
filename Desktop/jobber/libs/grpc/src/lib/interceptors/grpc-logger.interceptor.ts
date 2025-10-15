import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
(async () => {
  const { v4: uuidv4 } = await import('uuid'); // support commonJs in docker-node&Nx-serve modes
  console.log(uuidv4());
})();



@Injectable()
export class GrpcLoggerInterceptor implements NestInterceptor{
    private readonly logger = new Logger(GrpcLoggerInterceptor.name)
    // runs BEFORE FN execution(here grpc controller)  -----> request
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // where the intercept decorator is applied(Controller,....)
        const handler = context.getHandler().name; // here : authenticate method inside controller class
        const args = context.getArgs()[0]  // extract sth are appended to request (here : jwt)
        const startTime = Date.now()
        const requestId = uuidv4() // bond-correspond request&response of handler!

        this.logger.log({
            requestId,
            handler,
            args,
            
        })

        // AFTER FN execution(here : grpc Controller ) ---> response
        return next.handle().pipe(
            tap((response)=>{
                this.logger.log({
                    response,
                    requestId,
                    handler,
                    duration:Date.now() -startTime   // request processing latency
                })
            })
        )
    }
}