import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodDeedController } from './good-deed.controller';
import { GoodDeedService } from './good-deed.service';
import { GoodDeed, GoodDeedSchema } from './schema/good-deed.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GoodDeed.name, schema: GoodDeedSchema },
    ]),
  ],
  controllers: [GoodDeedController],
  providers: [GoodDeedService],
  exports: [GoodDeedService],
})
export class GoodDeedModule {}
