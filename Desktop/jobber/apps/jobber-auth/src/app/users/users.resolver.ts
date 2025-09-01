
import { Mutation, Resolver,Query, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Resolver()
export class UsersResolver {

    constructor(private readonly usersService:UsersService){}

    @Mutation(()=>User)
    async createUser(@Args('createUserDto') createUserDto:CreateUserDto){
        return await this.usersService.createUser(createUserDto)
    }


    @Query(()=>[User],{name:"users"})
    async getAllUsers(){
      
       return await this.usersService.findAll()
    }


    




}
