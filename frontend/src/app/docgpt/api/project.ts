import { Chat } from './chat';

export interface Project {
  id: string;
  name: string;
  userId: number;
  chats: Chat[];
}
