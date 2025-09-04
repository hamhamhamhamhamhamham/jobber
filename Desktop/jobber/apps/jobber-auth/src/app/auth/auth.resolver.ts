import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { GqlContext } from '@jobber/nestjs';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService:AuthService){}


    // + ctx configuration > app.module
    @Mutation(()=>User)
    async login(@Args('loginDto') loginDto:LoginDto,@Context() ctx:GqlContext ){
       return await this.authService.login(loginDto,ctx.res)
    }
   

}
