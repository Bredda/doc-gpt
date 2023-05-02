export const Languages = [
  { id: 0, name: 'Français', value: 'french' },
  { id: 1, name: 'English', value: 'english' }
];

export const Models = [
  { id: 0, name: 'gpt-3.5-turbo' },
  { id: 1, name: 'gpt4' }
];

export const ChatType = [
  { id: 0, name: 'Conversation Chat-GPT', value: 'conversationnal' },
  { id: 1, name: 'Chat with your data', value: 'chat_with_data' },
  { id: 2, name: 'Résumé de documents', value: 'summarization' }
];

export const GROUPED_CHAT_TYPE = [
  {
    label: 'Conversation',
    value: 'chat',
    items: [ChatType[0], ChatType[1]]
  },
  {
    label: 'Analyse',
    value: 'analyse',
    items: [ChatType[2]]
  }
];
