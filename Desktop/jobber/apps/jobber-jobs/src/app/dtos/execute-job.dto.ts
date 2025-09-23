import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsObject } from "class-validator";
import JSON from "graphql-type-json"


@InputType()
export class ExecuteJobDto{
    @Field()
    @IsNotEmpty()
    name:string;
    @Field(()=>JSON)  // json object type for graphql-> external library for this!
    @IsNotEmpty()
    @IsObject()
    data:object;
}

