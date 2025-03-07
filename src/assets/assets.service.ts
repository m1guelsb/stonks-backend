import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Model } from 'mongoose';
import { Asset } from './entities/asset.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';

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

  subscribePriceChangeEvents() {
    return new Observable((observer) => {
      this.assetSchema
        .watch(
          [
            {
              $match: {
                $or: [
                  { operationType: 'update' },
                  { operationType: 'replace' },
                ],
              },
            },
          ],
          {
            fullDocument: 'updateLookup',
            fullDocumentBeforeChange: 'whenAvailable',
          },
        )
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        .on('change', async (data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (data.fullDocument.price === data.fullDocumentBeforeChange.price) {
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const asset = await this.assetSchema.findById(data.fullDocument._id);

          observer.next({
            event: 'asset-price-change',
            data: asset!,
          });
        });
    });
  }
}
