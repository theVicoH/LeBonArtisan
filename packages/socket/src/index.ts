import { Server } from 'socket.io';
import { IServices } from 'common/types';

export default class ProductWebSocket {
  private io: Server;
  private services: IServices;

  constructor(server: any, services: IServices) {
    this.io = new Server(server);
    this.services = services;
    this.initialize();
  }

  private initialize(): void {
    this.io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('getAllProducts', async () => {
        try {
          const products = await this.services.product.getAllProducts();
          socket.emit('allProducts', products);
        } catch (err) {
          console.error('Failed to retrieve products:', err);
          socket.emit('error', 'Failed to retrieve products');
        }
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }
}

