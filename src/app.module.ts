import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './users/auth/auth.module';
import { GoodDeedModule } from './good-deeds/good-deed.module';
import { FriendModule } from './friends/friend.module';
import { FriendsGoodDeedsModule } from './friends-good-deeds/friends-good-deeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION, {
      dbName: process.env.DB_NAME,
    }),
    AuthModule,
    GoodDeedModule,
    FriendModule,
    FriendsGoodDeedsModule,
  ],
})
export class AppModule {}
