import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";



// 
// apply protection by imposing strategies to all resolvers functions(query,mutation)
 // looking for strategy with name 'jwt' ---> default name for Strategy is 'jwt'
// i think find by file name > jwt.strategy.ts!
export class GqlAuthGuard extends AuthGuard('jwt'){
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req;
    }
}