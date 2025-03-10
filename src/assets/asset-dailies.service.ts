import { InjectModel } from '@nestjs/mongoose';
import { AssetDaily } from './entities/asset-daily.entity';
import { Model } from 'mongoose';
import { Asset } from './entities/asset.entity';
import { CreateAssetDailyDto } from './dto/create-asset-daily.dto';
import { Observable } from 'rxjs';

export class AssetDailiesService {
  constructor(
    @InjectModel(AssetDaily.name) private assetDailySchema: Model<AssetDaily>,
    @InjectModel(Asset.name) private assetSchema: Model<Asset>,
  ) {}

  async findAll(symbol: string) {
    const asset = await this.assetSchema.findOne({ symbol });
    return this.assetDailySchema.find({ asset: asset!._id }).sort({ date: 1 });
  }

  async create(symbol: string, dto: CreateAssetDailyDto) {
    const asset = await this.assetSchema.findOne({ symbol: symbol });
    return this.assetDailySchema.create({
      asset: asset!._id,
      date: new Date(dto.date),
      price: dto.price,
    });
  }

  subscribeCreatedEvents(): Observable<AssetDaily & { asset: Asset }> {}
}
