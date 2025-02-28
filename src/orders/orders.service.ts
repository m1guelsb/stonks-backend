import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { Asset } from 'src/assets/entities/asset.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderSchema: Model<Order>) {}

  create({ assetId, walletId, price, shares, type }: CreateOrderDto) {
    return this.orderSchema.create({
      wallet: walletId,
      asset: assetId,
      price,
      type,
      shares,
      status: OrderStatus.PENDING,
      partial: shares,
    });
  }

  async findAll(filter: { walletId: string }) {
    return this.orderSchema
      .find({ wallet: filter.walletId })
      .populate('asset') as Promise<(Order & { asset: Asset })[]>;
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderSchema.findByIdAndUpdate(id, updateOrderDto);
  }

  remove(id: string) {
    return this.orderSchema.findByIdAndDelete(id);
  }
}
