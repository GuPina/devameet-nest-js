import { IsString, MinLength } from "class-validator"
import { UserMessagesHelper } from "../helpers/messages.helper";


export class UpdadeUserDto {
    @MinLength(2, {message: UserMessagesHelper.REGISTER_NAME_NOT_VALID})   
    name: string;


    @IsString()
    avatar: string;
}