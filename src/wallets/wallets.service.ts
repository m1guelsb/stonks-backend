import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { Model } from 'mongoose';
import { WalletAsset } from './entities/wallet-asset.entity';
import { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id);
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.walletSchema.findByIdAndUpdate(id, updateWalletDto);
  }

  remove(id: string) {
    return this.walletSchema.findByIdAndDelete(id);
  }

  createWalletAsset(
    walletId: string,
    { shares, assetId }: CreateWalletAssetDto,
  ) {
    return this.walletAssetSchema.create({
      wallet: walletId,
      asset: assetId,
      shares,
    });
  }
}
