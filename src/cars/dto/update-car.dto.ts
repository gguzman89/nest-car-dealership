import { IsOptional, IsString, IsUUID } from "class-validator";






export class UpdateCarDTO {

    @IsString()
    @IsUUID()
    @IsOptional() // by postman
    readonly id?:    string; // by typescript

    @IsString()
    @IsOptional()
    readonly brand?: string;
    @IsString()
    @IsOptional()
    readonly model?: string
}


