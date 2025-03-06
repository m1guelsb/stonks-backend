import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}

  @SubscribeMessage('orders/create')
  async handleMessage(client: any, payload: CreateOrderDto) {
    const order = await this.ordersService.create(payload);
    return order;
  }
}
