import {
  Controller,
  UseGuards,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateGoodDeedDto } from './dto/create-good-deed.dto';
import { UpdateGoodDeedDto } from './dto/update-good-deed.dto';
import { GoodDeedService } from './good-deed.service';
import { AuthGuard } from '@nestjs/passport';
import { GoodDeed } from './schema/good-deed.schema';

@Controller()
export class GoodDeedController {
  constructor(private readonly goodDeedService: GoodDeedService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id/good-deeds')
  async getGoodDeedsByUserId(
    @Param('id') goodDeedId: string,
  ): Promise<GoodDeed[]> {
    const existingGoodDeed =
      this.goodDeedService.getGoodDeedsByUser(goodDeedId);
    return existingGoodDeed;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/good-deeds/create')
  async createGoodDeed(
    @Body() createGoodDeedDto: CreateGoodDeedDto,
  ): Promise<GoodDeed> {
    const createdGoodDeed =
      this.goodDeedService.createGoodDeed(createGoodDeedDto);
    return createdGoodDeed;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/good-deeds/update/:id')
  async updateGoodDeed(
    @Param('id') id: string,
    @Body() updateGoodDeedDto: UpdateGoodDeedDto,
  ): Promise<GoodDeed> {
    const updatedGoodDeed = this.goodDeedService.updateGoodDeed(
      id,
      updateGoodDeedDto,
    );
    return updatedGoodDeed;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/good-deeds/remove/:id')
  async removeGoodDeed(@Param('id') id: string): Promise<GoodDeed> {
    const removedGoodDeed = this.goodDeedService.removeGoodDeed(id);
    return removedGoodDeed;
  }
}
