// USER MODEL > FIELDS to EXPOSE

import { Field, ObjectType } from "@nestjs/graphql";
import {AbstractModel} from "@jobber/nestjs"



@ObjectType() 
export class User extends AbstractModel{
    @Field()
    email :string;    // api exposese > password excluded
}