import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Friend, FriendSchema } from 'src/friends/schema/friend.schema';
import {
  GoodDeed,
  GoodDeedSchema,
} from '../good-deeds/schema/good-deed.schema';
import { FriendsGoodDeedsController } from './friends-good-deeds.controller';
import { FriendModule } from 'src/friends/friend.module';
import { GoodDeedModule } from 'src/good-deeds/good-deed.module';
import { UserModule } from 'src/users/users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friend.name, schema: FriendSchema },
      { name: GoodDeed.name, schema: GoodDeedSchema },
    ]),
    FriendModule,
    GoodDeedModule,
    UserModule,
  ],
  controllers: [FriendsGoodDeedsController],
})
export class FriendsGoodDeedsModule {}
