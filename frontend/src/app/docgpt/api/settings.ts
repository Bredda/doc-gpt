export type Setting = {
  id: number;
  label: string;
  code: string;
};

export const Languages: Setting[] = [
  { id: 0, label: 'Français', code: 'french' },
  { id: 1, label: 'English', code: 'english' }
];

export const Models: Setting[] = [
  { id: 0, label: 'gpt-3.5-turbo', code: 'gpt-3.5-turbo' },
  { id: 1, label: 'gpt4', code: 'gpt4' }
];

export const ChatType: Setting[] = [
  { id: 0, label: 'Conversation Chat-GPT', code: 'conversationnal' },
  { id: 1, label: 'Chat with your data', code: 'chat_with_data' },
  { id: 2, label: 'Résumé de document', code: 'summarization' },
  { id: 3, label: 'Génération de code', code: 'code_generation' }
];
