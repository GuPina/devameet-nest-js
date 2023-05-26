import { Controller, Post, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./user/dtos/register.dto";
import { isPublic } from "./decorators/ispublic.decorator";

@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @isPublic()
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @isPublic()
    register(@Body() dto: RegisterDto){
        return this.authService.register(dto);
    }
}