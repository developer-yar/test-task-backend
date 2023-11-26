import { IsDateString, IsString, Length, MaxLength } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateGoodDeedDto {
  @IsString()
  @Length(24)
  readonly userId: Schema.Types.ObjectId;

  @IsString()
  @MaxLength(1000)
  readonly title: string;

  @IsDateString()
  @MaxLength(30)
  readonly date: Date;
}
