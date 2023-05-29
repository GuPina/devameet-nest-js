import {Injectable} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/use.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dtos/register.dto';
import * as CryptoJS from 'crypto-js';
import { UpdadeUserDto } from './dtos/updateuser.dt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async create(dto: RegisterDto){
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();

        const createUser = new this.userModel(dto);
        await createUser.save();
    }

    async exisitsByEmail(email : String) : Promise<boolean>{
        const result = await this.userModel.findOne({email});

        if(result){
            return true;
        }

        return false;
    }

    async getUserByLoginPassword(email: string, password: string) : Promise<UserDocument | null>{
        const user = await this.userModel.findOne({email}) as UserDocument;
        if(user){
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.USER_CYPHER_SECRET_KEY);
            const savedPassword = bytes.toString(CryptoJS.enc.Utf8);

            if(password == savedPassword){
                return user;
            }
        }

        return null;
    }

    async getUserById(id:string){
        return await this.userModel.findById(id);
    }

    async updateUser(id: string, dto: UpdadeUserDto){
       return await this.userModel.findByIdAndUpdate(id, dto); 
    }
}