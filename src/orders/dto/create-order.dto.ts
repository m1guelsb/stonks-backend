import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { OrderType } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  walletId: string;

  @IsNotEmpty()
  assetId: string;

  @IsNotEmpty()
  @IsInt()
  shares: number;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsEnum(OrderType)
  type: OrderType;
}
