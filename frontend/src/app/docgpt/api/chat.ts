export interface Chat {
  id: string;
  name: string;
  settings: ChatSettings;
  messages: ChatMessage[];
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

export interface Source {
  id: string;
  pageContent: string;
  source: string;
  to: number;
  from: number;
}
