import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAssetDailyDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
