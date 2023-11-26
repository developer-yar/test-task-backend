import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users/schema/user.schema';

export type FriendDocument = mongoose.HydratedDocument<Friend>;

@Schema()
export class Friend {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  initiatorId: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  receiverId: User;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
