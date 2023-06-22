import { IsString, minLength } from "class-validator";

export class CreateCarDTO {

    @IsString()
    readonly brand: string;

    @IsString()
    readonly model: string;
}