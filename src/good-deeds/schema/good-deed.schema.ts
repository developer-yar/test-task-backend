import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/users/schema/user.schema';

export type GoodDeedDocument = mongoose.HydratedDocument<GoodDeed>;

@Schema()
export class GoodDeed {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: Date;
}

export const GoodDeedSchema = SchemaFactory.createForClass(GoodDeed);
