import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AssetsService } from './assets.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AssetPresenter } from './asset.presenter';
import { AssetDailiesService } from './asset-dailies.service';
import { AssetDailyPresenter } from './asset-daily.presenter';

@WebSocketGateway({ cors: true })
export class AssetsGateway implements OnGatewayInit {
  logger = new Logger(AssetsGateway.name);

  constructor(
    private assetsService: AssetsService,
    private assetsDailiesService: AssetDailiesService,
  ) {}

  afterInit(server: Server) {
    this.assetsService.subscribePriceChangeEvents().subscribe(({ asset }) => {
      server
        .to(asset.symbol)
        .emit('assets/price-change', new AssetPresenter(asset).toJSON());
    });

    this.assetsDailiesService
      .subscribeCreatedEvents()
      .subscribe(({ assetDaily }) => {
        server
          .to(assetDaily.asset.symbol)
          .emit(
            'assets/daily-creation',
            new AssetDailyPresenter(assetDaily).toJSON(),
          );
      });
  }

  @SubscribeMessage('join-assets')
  handleJoinAssets(client: Socket, payload: { symbols: string[] }) {
    if (!payload.symbols?.length) return;

    payload.symbols.forEach((symbol) => {
      void client.join(symbol);
    });
    this.logger.log(
      `Client ${client.id} joined assets: ${payload.symbols.join(', ')}`,
    );
  }
  @SubscribeMessage('join-asset')
  handleJoinAsset(client: Socket, payload: { symbol: string }) {
    void client.join(payload.symbol);
    this.logger.log(`Client ${client.id} joined asset: ${payload.symbol}`);
  }

  @SubscribeMessage('leave-assets')
  handleLeaveAssets(client: Socket, payload: { symbols: string[] }) {
    if (!payload.symbols?.length) return;

    payload.symbols.forEach((symbol) => {
      void client.leave(symbol);
    });
    this.logger.log(
      `Client ${client.id} left assets: ${payload.symbols.join(', ')}`,
    );
  }
  @SubscribeMessage('leave-asset')
  handleLeaveAsset(client: Socket, payload: { symbol: string }) {
    void client.leave(payload.symbol);
    this.logger.log(`Client ${client.id} left asset: ${payload.symbol}`);
  }
}
