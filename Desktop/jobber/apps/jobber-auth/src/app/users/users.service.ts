import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/jobber-auth';  // TYPES OFFERED BY PRISMA based on user table!
import {hash} from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(private readonly prismaService:PrismaService){}
    async createUser(createUserDto:Prisma.UserCreateInput){
     return await  this.prismaService.user.create({
        data:{
          ...createUserDto,
          password:await hash(createUserDto.password,10)
        }
      })
    }

    async findAll(){
     
      return await this.prismaService.user.findMany()
    }

}
