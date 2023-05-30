import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meet, MeetDocument } from './schemas/meet.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/auth/user/user.services';
import { GetMeetDto } from './dtos/getmeet.dto';
import { CreateMeetDto } from './dtos/createmeet.dto';
import { generateLink } from './helpers/linkgenerator.helper';
import { MeetObject, MeetObjectDocument } from './schemas/meetobject.schema';
import { UpdateMeetDto } from './dtos/updatemeet.dto';
import { MeetMessagesHelper } from './helpers/meetmessages.helper';

@Injectable()
export class MeetService {
    private readonly logger = new Logger(MeetService.name);

    constructor(
        @InjectModel(Meet.name) private readonly model: Model<MeetDocument>,
        @InjectModel(MeetObject.name) private readonly ObjectModel: Model<MeetObjectDocument>,
        private readonly userService: UserService
    ){}

    async getMeetsByUser(userId:String){
        this.logger.debug('getMeetByUser - ' + userId);
        return await this.model.find({user: userId});
    }

    async createMeet(userId:string, dto:CreateMeetDto){
        this.logger.debug('getMeetByUser - ' + userId);

        const user = await this.userService.getUserById(userId);

        const meet = {
            ...dto, 
            user,
            link: generateLink()
        };
        const createMeet = new this.model(meet);
        return await createMeet.save();
    }
    
    async deleteMeetByUser(userId:String, meetId:string){
        this.logger.debug(`deleteMeetByUser - ${userId} - ${meetId}`);
        return await this.model.deleteOne({user: userId, _id: meetId});
    }

    async getMeetObjects(meetId:string, userId:string){
        this.logger.debug(`deleteMeetByUser - ${userId} - ${meetId}`);
        const user = await this.userService.getUserById(userId);
        const meet = await this.model.findOne({user, _id: meetId});

        return await this.ObjectModel.find({meet});
    }

    async update(meetId:string, userId:string, dto: UpdateMeetDto){
        this.logger.debug(`update - ${userId} - ${meetId}`);
        const user = await this.userService.getUserById(userId);
        const meet = await this.model.findOne({user, _id: meetId});

        if(!meet){
            throw new BadRequestException(MeetMessagesHelper.UPDATE_MEET_NOT_FOUND)
        }

        meet.name = dto.name;
        meet.color = dto.color;
        await this.model.findByIdAndUpdate({_id: meetId}, meet);

        await this.ObjectModel.deleteMany({meet});

        let objectPayload;

        for (const object of dto.objects) {
            objectPayload = {
                meet,
                ...object
            }

            await this.ObjectModel.create(objectPayload);
        }

    }
}
