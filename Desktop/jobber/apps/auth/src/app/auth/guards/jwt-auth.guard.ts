import {AuthGuard} from "@nestjs/passport"



// ✨grapc request > call 'jwt' strategy
export class JwtAuthGuard extends AuthGuard('jwt'){}