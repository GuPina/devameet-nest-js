import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meet, MeetDocument } from 'src/meet/schemas/meet.schema';
import { MeetObject, MeetObjectDocument } from 'src/meet/schemas/meetobject.schema';
import { Position, PositionDocument } from './Schemas/positions.schemas';
import { UserService } from 'src/auth/user/user.services';
import { RoomMessagesHelper } from './helpers/roommessages.helper';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';

@Injectable()
export class RoomService {
    private logger = new Logger(RoomService.name);

    constructor(
        @InjectModel(Meet.name) private readonly meetModel: Model<MeetDocument>,
        @InjectModel(MeetObject.name) private readonly objectModel: Model<MeetObjectDocument>,
        @InjectModel(Position.name) private readonly positionModel: Model<PositionDocument>,
        private readonly userService: UserService
    ){}

    async getRoom(link: string){
        this.logger.debug(`getRoom - ${link}`);

        const meet = await this._getMeet(link);
        const objects = this.objectModel.find({ meet });

        return {
            link,
            name: meet.name,
            color: meet.color,
            objects
        };
    }

    async listUsersPositionByLink(link: string){
        this.logger.debug(`listUsersPositionByLink - ${link}`);

        const meet = await this._getMeet(link);
        return await this.positionModel.find({meet});
    }

    async deleteUsersPositionBy(clientId: string){
        this.logger.debug(`listUsersPositionByLink - ${clientId}`);
        return await this.positionModel.deleteMany({clientId});
    }

    async updateUserPosition(dto : UpdateUserPositionDto){
        this.logger.debug(`listUsersPositionByLink - ${dto.link}`);

        const meet = await this._getMeet(dto.link);
        const user = await this.userService.getUserById(dto.userId)
    }

    async _getMeet(link:string){
        const meet = await this.meetModel.findOne({link});
        if(!meet){
            throw new BadRequestException(RoomMessagesHelper.JOIN_LINK_NOT_VALID)
        }

        return meet;
    }
}
