import { OriginalDocument } from './original-document';

export interface Chat {
  id: string;
  name: string;
  settings: ChatSettings;
  messages: ChatMessage[];
  summaries: ChatSummary[];
}

export interface ChatSettings {
  id?: string;
  language: any;
  model: any;
  type: any;
}

export interface ChatMessage {
  id: string;
  content: string;
  origin: string;
  sources?: Source[];
}

export interface ChatSummary {
  id: string;
  content: string;
  document: OriginalDocument;
}

export interface Source {
  id: string;
  pageContent: string;
  source: string;
  to: number;
  from: number;
}
