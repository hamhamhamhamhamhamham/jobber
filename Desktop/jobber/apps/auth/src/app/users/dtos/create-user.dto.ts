import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsStrongPassword } from "class-validator";


@InputType()
export class CreateUserDto{
    @IsEmail()       
    @Field()         // validation error from graphql server UI
    email:string;
    @Field()
    @IsStrongPassword()
    password:string;
}