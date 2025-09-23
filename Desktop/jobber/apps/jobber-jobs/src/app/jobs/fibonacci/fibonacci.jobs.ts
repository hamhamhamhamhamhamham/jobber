import {IsNotEmpty, IsNumber} from "class-validator"


export class FibonacciData{
    @IsNotEmpty() 
    @IsNumber()   
    iterations:number
}