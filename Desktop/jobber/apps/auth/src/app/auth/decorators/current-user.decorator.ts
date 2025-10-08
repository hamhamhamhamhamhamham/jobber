//👉 Custom param decerotor to extract data(user) from traffic(request)

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// no data is passed to decorator -> unknown;
// ctx >> extract data from request; 
export const CurrentUser = createParamDecorator( // calllback fn as input

  (_data: unknown, ctx: ExecutionContext) => { 
    const gqlCtx = GqlExecutionContext.create(ctx);
    return gqlCtx.getContext().req.user; // req > app.module  // user > Guard fn 
  },

     
)




