import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserModule } from 'src/auth/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './Schemas/positions.schemas';
import { MeetModule } from 'src/meet/meet.module';
import { RoomGateway } from './room.gateway';

@Module({
  imports:[ MeetModule,RoomModule, UserModule, MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema}
    ])
  ],
  providers: [RoomService, RoomGateway],
  controllers: [RoomController]
})
export class RoomModule {}
