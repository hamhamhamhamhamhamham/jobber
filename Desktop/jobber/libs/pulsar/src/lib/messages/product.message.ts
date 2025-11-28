import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";



export class ProductMessage{
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    category:string;
    @IsNumber()
    @Min(0)
    price:number;
    @IsInt()
    @Min(0)
   
    stock:number;
    @Min(0)
    @Max(5)
    rating:number;


    @IsString()
    @IsNotEmpty()
    description:string;
}