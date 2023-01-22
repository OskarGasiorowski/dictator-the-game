import {
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GameRoomGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    public server: Server;

    handleConnection(@ConnectedSocket() client: Socket): any {
        client.join('test-room');
    }

    handleDisconnect(@ConnectedSocket() client: Socket): any {
        client.leave('test-room');
    }

    playerJoined(player: { name: string; id: string }) {
        console.log('here');
        this.server.to('test-room').emit('playerJoined', player);
    }
}
