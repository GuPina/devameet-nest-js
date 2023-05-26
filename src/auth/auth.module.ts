import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "./user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategiy";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports:[
        UserModule,
        JwtModule.register({
            secret: process.env.USER_JWT_SECRET_KEY
        })
    ],
    controllers:[AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule{}