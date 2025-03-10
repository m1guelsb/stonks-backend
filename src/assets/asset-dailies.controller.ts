import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetDailiesService } from './asset-dailies.service';
import { CreateAssetDailyDto } from './dto/create-asset-daily.dto';

@Controller('assets/:symbol/dailies')
export class AssetsDailiesController {
  constructor(private assetsDailiesService: AssetDailiesService) {}

  @Get()
  findAll(@Param('symbol') symbol: string) {
    return this.assetsDailiesService.findAll(symbol);
  }

  @Post()
  create(@Body() dto: CreateAssetDailyDto, @Param('symbol') symbol: string) {
    return this.assetsDailiesService.create(symbol, dto);
  }
}
