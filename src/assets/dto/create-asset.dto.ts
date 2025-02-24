import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  name: string;

  @MinLength(2, {
    message: 'symbol is too short',
  })
  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image: string;
}
