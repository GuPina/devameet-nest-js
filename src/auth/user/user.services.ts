import {Injectable} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/use.schema';
import { Model } from 'mongoose';
import { RegisterDto } from './dtos/register.dto';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

    async create(dto: RegisterDto){
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();

        const createUser = new this.userModel(dto);
        await createUser.save();
    }

    async exisitsByEmail(email : String) : Promise<boolean>{
        const result = await this.userModel.find({email});

        if(result){
            return true;
        }

        return false;
    }
}