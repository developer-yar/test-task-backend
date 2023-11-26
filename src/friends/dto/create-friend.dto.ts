import { Schema } from 'mongoose';
import { IsString, Length } from 'class-validator';

export class CreateFriendDto {
  @IsString()
  @Length(24)
  readonly initiatorId: Schema.Types.ObjectId;

  @IsString()
  @Length(24)
  readonly receiverId: Schema.Types.ObjectId;
}
