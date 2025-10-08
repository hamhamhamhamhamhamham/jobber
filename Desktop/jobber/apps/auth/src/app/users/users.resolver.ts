
import { Mutation, Resolver,Query, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TokenPayload } from '@jobber/graphql';

@Resolver()
export class UsersResolver {

    constructor(private readonly usersService:UsersService){}

    @Mutation(()=>User)
    async createUser(@Args('createUserDto') createUserDto:CreateUserDto){
        return await this.usersService.createUser(createUserDto)
    }

    @UseGuards(GqlAuthGuard) // guard
    @Query(()=>[User],{name:"users"})
    async getAllUsers(@CurrentUser() {userId}:TokenPayload){ //custom param decorator
    //    console.log(userId)
       return await this.usersService.findAll()
    }


    




}
