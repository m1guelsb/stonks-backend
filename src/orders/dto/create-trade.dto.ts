import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateTradeDto {
  @IsNotEmpty()
  orderId: string;

  @IsEnum([OrderStatus.OPEN, OrderStatus.CLOSED])
  status: OrderStatus.OPEN | OrderStatus.CLOSED;

  @IsNotEmpty()
  relatedInvestorId: string;

  @IsNotEmpty()
  brokerTradeId: string;

  @IsNumber()
  shares: number;

  @IsNumber()
  price: number;

  @IsDate()
  date: Date;
}
