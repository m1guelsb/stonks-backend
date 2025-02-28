import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Model } from 'mongoose';
import { Asset } from './entities/asset.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}

  create(createAssetDto: CreateAssetDto) {
    return this.assetSchema.create(createAssetDto);
  }

  findAll() {
    return this.assetSchema.find();
  }

  findOne(symbol: string) {
    return this.assetSchema.findOne({ symbol }).collation({
      locale: 'en',
      strength: 1,
    });
  }

  update(id: string, updateAssetDto: UpdateAssetDto) {
    return this.assetSchema.findByIdAndUpdate(id, updateAssetDto);
  }

  remove(id: string) {
    return this.assetSchema.findByIdAndDelete(id);
  }
}
