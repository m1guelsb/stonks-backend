import crypto from 'crypto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({
  timestamps: true,
  //to have the document previous version
  collectionOptions: {
    changeStreamPreAndPostImages: {
      enabled: true,
    },
  },
})
export class Asset {
  //change defaut mongo id hash
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  symbol: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
