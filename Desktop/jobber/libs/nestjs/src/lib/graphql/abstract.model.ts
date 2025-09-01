import {Field, ID, ObjectType} from "@nestjs/graphql"


@ObjectType({isAbstract:true}) //extendable
export class AbstractModel{
    @Field(()=>ID)
    id: number;
}


