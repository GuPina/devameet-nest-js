import { Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/use.schema";
import { UserService } from "./user.services";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [],
    providers: [UserService],
    exports: [MongooseModule, UserService]
})
export class UserModule{

}