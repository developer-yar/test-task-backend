import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Friend } from './schema/friend.schema';
import { removeFriendDto } from './dto/remove-friend-dto';

@Injectable()
export class FriendService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<Friend>) {}

  async isFriendship(createFriendDto: CreateFriendDto): Promise<Friend> {
    const {
      initiatorId,
      receiverId,
    }: { initiatorId: ObjectId; receiverId: ObjectId } = createFriendDto;

    const existedFriendship = await this.friendModel.findOne({
      $or: [
        { initiatorId: initiatorId, receiverId: receiverId },
        { initiatorId: receiverId, receiverId: initiatorId },
      ],
    });

    return existedFriendship;
  }

  async getAllFriends(id: string): Promise<Friend[]> {
    const friends = await this.friendModel.find({
      $or: [{ initiatorId: id }, { receiverId: id }],
    });
    return friends;
  }

  async addToFriends(createFriendDto: CreateFriendDto): Promise<Friend> {
    if (await this.isFriendship(createFriendDto))
      throw new Error('Данные пользователи уже дружат между собой.');

    const newFriend = new this.friendModel(createFriendDto).save();
    return newFriend;
  }

  async removeFromFriends(removeFriendDto: removeFriendDto): Promise<Friend> {
    if (!(await this.isFriendship(removeFriendDto)))
      throw new Error('Данные пользователи не дружат между собой.');

    const removedFriend = await this.friendModel.findOneAndDelete({
      $or: [
        {
          initiatorId: removeFriendDto.initiatorId,
          receiverId: removeFriendDto.receiverId,
        },
        {
          initiatorId: removeFriendDto.receiverId,
          receiverId: removeFriendDto.initiatorId,
        },
      ],
    });
    return removedFriend;
  }
}
