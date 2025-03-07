import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const assetsService = app.get(AssetsService);
  // assetsService.subscribePriceChangeEvents().subscribe((event) => {
  //   console.log(event);
  // });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
