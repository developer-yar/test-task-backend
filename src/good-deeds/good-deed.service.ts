import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoodDeed } from './schema/good-deed.schema';
import { CreateGoodDeedDto } from './dto/create-good-deed.dto';
import { UpdateGoodDeedDto } from './dto/update-good-deed.dto';

@Injectable()
export class GoodDeedService {
  constructor(
    @InjectModel(GoodDeed.name) private goodDeedModel: Model<GoodDeed>,
  ) {}

  async createGoodDeed(
    createGoodDeedDto: CreateGoodDeedDto,
  ): Promise<GoodDeed> {
    const newGoodDeed = new this.goodDeedModel(createGoodDeedDto);
    return newGoodDeed.save();
  }

  async getGoodDeedsByUser(userId: string): Promise<GoodDeed[]> {
    const userGoodDeedsList = this.goodDeedModel
      .find({ userId })
      .sort({ date: -1 });
    return userGoodDeedsList;
  }

  async removeGoodDeed(id: string): Promise<GoodDeed> {
    const removedGoodDeed = this.goodDeedModel.findByIdAndDelete(id);
    return removedGoodDeed;
  }

  async updateGoodDeed(
    goodDeedId: string,
    updateGoodDeedDto: UpdateGoodDeedDto,
  ): Promise<GoodDeed> {
    const updatedGoodDeed = this.goodDeedModel.findByIdAndUpdate(
      goodDeedId,
      updateGoodDeedDto,
      { new: true },
    );
    return updatedGoodDeed;
  }
}
