import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { removeFriendDto } from './dto/remove-friend-dto';
import { FriendService } from './friend.service';
import { AuthGuard } from '@nestjs/passport';
import { Friend } from './schema/friend.schema';

@Controller()
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/friends')
  async getAllFriends(@Param('id') id: string): Promise<Friend[]> {
    const friends = this.friendService.getAllFriends(id);
    return friends;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/friends/add')
  async addToFriends(
    @Body() createFriendDto: CreateFriendDto,
  ): Promise<Friend> {
    const newFriend = this.friendService.addToFriends(createFriendDto);
    return newFriend;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/friends/remove')
  async removeFromFriends(
    @Body() removeFriendDto: removeFriendDto,
  ): Promise<Friend> {
    const removedFriend = this.friendService.removeFromFriends(removeFriendDto);
    return removedFriend;
  }
}
