import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  currentChat = this.socket.fromEvent<any>('chat');

  constructor(private socket: Socket) {}

  query(query: string) {
    this.socket.emit('query', query);
  }
}
