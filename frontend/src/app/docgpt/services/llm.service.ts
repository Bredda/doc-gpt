import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LlmService {
  socket!: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      autoConnect: true,
      reconnection: true
    });
  }

  query(chatId: string, query: string) {
    console.log('Query service');

    this.socket.emit('conversation-query', { chatId: chatId, query: query });
    this.socket.on('conversation-response', (resp) => console.log(resp));
  }
}
