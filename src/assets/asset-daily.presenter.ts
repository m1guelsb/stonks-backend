import { AssetPresenter } from './asset.presenter';
import { AssetDaily } from './entities/asset-daily.entity';
import { Asset } from './entities/asset.entity';

export class AssetDailyPresenter {
  constructor(private assetDaily: AssetDaily) {}

  toJSON() {
    return {
      _id: this.assetDaily._id,
      price: this.assetDaily.price,
      date: this.assetDaily.date,
      asset: new AssetPresenter(this.assetDaily.asset as Asset).toJSON(),
    };
  }
}
