import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from "@apollo/server";
import { Logger } from "@nestjs/common";
const { v4 : uuidv4 } = require("uuid");


//CUSTOM functionality to APOLLO SERVER(graphql traffic)
export class GqlLoggerPlugin implements ApolloServerPlugin<BaseContext> {
  //from now on LOGGERs are pino logger that is set in main.ts
  private readonly logger = new Logger(GqlLoggerPlugin.name);
  // before execution of MUTATION or QUERY .
  // clients incoming requests info!
  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>
  ): Promise<GraphQLRequestListener<BaseContext>> {
    const { request } = requestContext;
    const start = Date.now();
    const requestId = uuidv4() // bond-correspond request & response QUery or Mutation!
    
    this.logger.log({ 
      requestId,
      headers: request.http?.headers,
      query: request.query,
      variables: request.variables,
    });
    
    // auto called after execution of MUTAION & QUERY .
    return {
       willSendResponse: async (responseContext) => {
        const duration = Date.now() - start;

        this.logger.log({
          requestId,
          query: request.query,
          statusCode: responseContext.response?.http?.status || 200,
          duration: `${duration}ms`,
          });
      },
    };
  }
}
