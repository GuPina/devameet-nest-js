import { Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/use.schema";
import { UserService } from "./user.services";
import { UserController } from "./user.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [MongooseModule, UserService]
})
export class UserModule{}