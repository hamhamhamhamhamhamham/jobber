import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from '../users/users.service';

import  {Request,Response} from "express"
import {compare} from "bcryptjs"

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@jobber/nestjs';



export interface GqlContext{
    res:Response,
    req:Request
}
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService:UsersService,
        private readonly configService:ConfigService,
        private readonly jwtService:JwtService
    ){}
    async login({email,password}:LoginDto,response:Response){
     const user =  await  this.verifyUser(email,password)

     const expires = new Date()   
     expires.setMilliseconds(
        expires.getTime() + parseInt(this.configService.getOrThrow("JWT_EXPIRES_IN_MS"))
     )   

     const tokenPayload:TokenPayload = {
        userId :user.id
     }
     const accessToken = this.jwtService.sign(tokenPayload)

    
    // ✨REPONSE  httpOnlyCOOKIE(AuthenticationToken) with jwt value 
    // 🐱‍🏍cookie automatically sticks to each request from client, UNDER THE HOOD!!!
    response.cookie("AuthenticationToken",accessToken,{
        httpOnly:true, // ⁉️ client JS can not grab jwt!! , but your eyes can in browser inspection!!
        secure:this.configService.get("NODE_ENV")=="production", //cookie transmits through  HTTPS protocol > fully encrypted;
        expires:expires, //client cookie vanishes at same time with jwt!
        // sameSite:true
    
    })

    return user;  // 👉 mutation function expects User model as return value!

    }
    
    



    async verifyUser(email:string,password:string){
        try{
        const user = await this.usersService.findUserByUniques({email})

        
        const isAutheticated = await compare(password,user.password)
        if(!isAutheticated){
              throw new UnauthorizedException("password & email mismatch!>AuthService:verifyUser")
        }
        return user
        
        }catch(err){
            throw new UnauthorizedException("verification process Failed! >AuthService:verifyUser")
        }   
    }

}
