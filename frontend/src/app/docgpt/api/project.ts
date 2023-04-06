import { Chat } from './chat';

export interface Project {
  id: number;
  name: string;
  userId: number;
  chats: Chat[];
}
