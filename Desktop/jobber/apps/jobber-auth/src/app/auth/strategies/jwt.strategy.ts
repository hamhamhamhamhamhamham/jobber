import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import {Request} from "express" 
import { TokenPayload } from "@jobber/nestjs";


//👉 PARSE AND DECODE each request(cookie with jwt sticks to) > VERIFY cookie jwt with JWT_SECRET 
//✔️ works along with cookie-parser(main.ts) 3rd party library to parse each request ;
@Injectable() //✔️ enable adding dependencies to this class!
export class JwtStrategy extends PassportStrategy(Strategy){ // calling constructor & class as arg!
    
    constructor(configService:ConfigService){
        super({            // calling parent constructor again to > provide configs to underlying layers
            jwtFromRequest:ExtractJwt.fromExtractors([
                (request:Request) => request.cookies.AuthenticationToken,
            ]),
            secretOrKey:configService.getOrThrow('JWT_SECRET')
        })
    }
    //👉 auto invoked to stick payload(userID) to traffic/request
    validate(payload:TokenPayload){
        return payload  //✨return value is set to ctx.req.user(user is preset name) >> req.user = {userID:3}
    }
}