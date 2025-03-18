import crypto from 'crypto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Wallet, WalletDocument } from 'src/wallets/entities/wallet.entity';
import { Asset, AssetDocument } from 'src/assets/entities/asset.entity';
import { Trade } from './trade.entity';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ default: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ default: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop()
  price: number;

  @Prop()
  type: OrderType;

  @Prop()
  status: OrderStatus;

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop({ type: [mongoose.Schema.Types.String], ref: 'Trade' })
  trades: Trade[] | string[];

  createdAt!: Date;
  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
