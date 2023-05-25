import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helper";
import { RegisterDto } from "./user/dtos/register.dto";
import { UserService } from "./user/user.services";
import { UserMessagesHelper } from "./user/helpers/messages.helper";

@Injectable()
export class AuthService{
    private logger = new Logger(AuthService.name);

    constructor(private readonly userService: UserService){}

   login(dto: LoginDto){
        this.logger.debug('login - starded')
        if(dto.login !== 'teste@teste.com' || dto.password !== 'teste@123'){
            throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOND)
        }

        return dto;
    }

    async register(dto: RegisterDto){
        this.logger.debug('register - started');
        if(await this.userService.exisitsByEmail(dto.email)){
            throw new BadRequestException(UserMessagesHelper.REGISTER_EXIST_EMAIL_ACCOUNT);
        }

        await this.userService.create(dto);
    }
}