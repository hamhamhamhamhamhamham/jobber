import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthenticateRequest, AuthServiceController, AuthServiceControllerMethods, GrpcLoggerInterceptor, User} from "@jobber/grpc"

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '@jobber/graphql';





// RECIEVER
@Controller('auth')
@UseGuards(JwtAuthGuard) // funnel throw this
@UseInterceptors(GrpcLoggerInterceptor) // applied to all controller fns(routes)
@AuthServiceControllerMethods() // direct grpc request to this controller(actually authenticate method)
export class AuthController implements AuthServiceController{

    constructor(private readonly usersService:UsersService){}
    
    authenticate(request: AuthenticateRequest & {user:TokenPayload}): Promise<User> | Observable<User> | User {

        // ✨ grpc Request not graphQl request
        // 🔰 grpc request > {token} , with auth gurd,strategy {token,userId,...}
        // console.log("AuthCONTROLLER -> grpc  ",request)
        // return user data > User Type : authenticate !!
        return this.usersService.findUserByUniques({id:request.user.userId})
 
    }
}
