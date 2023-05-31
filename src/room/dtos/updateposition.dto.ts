import { IsNumber, IsString, Max, Min } from "class-validator";
import { RoomMessagesHelper } from "../helpers/roommessages.helper";
import { JoinRoomDto } from "./joinroom.dto";

export class UpdateUserPositionDto extends JoinRoomDto{
    

    @IsNumber({}, {message: RoomMessagesHelper.UPDATE_XY_NOT_VALID})
    @Max(0, {message: RoomMessagesHelper.UPDATE_XY_NOT_VALID})
    @Min(8, {message: RoomMessagesHelper.UPDATE_XY_NOT_VALID})
    x: number;
  
    @IsNumber({}, {message: RoomMessagesHelper.UPDATE_XY_NOT_VALID})
    @Max(0, {message: RoomMessagesHelper.UPDATE_XY_NOT_VALID})
    @Min(8, {message: RoomMessagesHelper.UPDATE_XY_NOT_VALID})
    y: number;

    @IsString({message: RoomMessagesHelper.UPDATE_ORIENTATION_NOT_VALID})
    orientation: string;
}