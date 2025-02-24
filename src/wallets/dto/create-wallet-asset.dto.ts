import { IsNotEmpty } from 'class-validator';

export class CreateWalletAssetDto {
  @IsNotEmpty()
  shares: number;

  @IsNotEmpty()
  assetId: string;
}
