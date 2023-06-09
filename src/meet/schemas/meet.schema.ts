import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";
import { User } from "src/auth/user/schemas/use.schema";

export type MeetDocument = HydratedDocument<Meet>;

@Schema()
export class Meet {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
    @Prop({required: true})
    name: string;
    
    @Prop({required: true})
    color: string;

    @Prop({required: true})
    link: string;
}

export const MeetSchema = SchemaFactory.createForClass(Meet);