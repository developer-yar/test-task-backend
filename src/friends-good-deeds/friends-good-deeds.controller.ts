import { Controller, UseGuards, Param, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendService } from 'src/friends/friend.service';
import { GoodDeedService } from '../good-deeds/good-deed.service';
import { UserService } from 'src/users/users/user.service';
import { GoodDeed } from '../good-deeds/schema/good-deed.schema';
import { User } from 'src/users/users/schema/user.schema';
import { CreateFriendDto } from 'src/friends/dto/create-friend.dto';

@Controller()
export class FriendsGoodDeedsController {
  constructor(
    private readonly friendService: FriendService,
    private readonly goodDeedService: GoodDeedService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:user_id/good-deeds/:friend_id')
  async getFriendGoodDeeds(
    @Param('user_id') userId,
    @Param('friend_id') friendId,
  ): Promise<{ surname: string; name: string; goodDeeds: GoodDeed[] }> {
    const dto: CreateFriendDto = {
      initiatorId: userId,
      receiverId: friendId,
    };

    if (await this.friendService.isFriendship(dto)) {
      const goodDeeds = await this.goodDeedService.getGoodDeedsByUser(friendId);
      const { surname, name } = await this.userService.getUser(friendId);
      return { surname, name, goodDeeds };
    } else
      throw new Error(
        'Невозможно получить список добрых дел, пользователь не дружит с данным пользователем',
      );
  }
}
