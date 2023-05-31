import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserModule } from 'src/auth/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './Schemas/positions.schemas';
import { MeetModule } from 'src/meet/meet.module';

@Module({
  imports:[ MeetModule,RoomModule, UserModule, MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema}
    ])
  ],
  providers: [RoomService],
  controllers: [RoomController]
})
export class RoomModule {}
