import { Language } from '../../domain/api/enum';

export const ENGLISH_CONTEXT = "Here's previous context:";
export const FRENCH_CONTEXT = 'Voici le contexte précédent:';

export const PROMPT_CONTEXT: Record<Language, string> = {
  [Language.FRENCH]: FRENCH_CONTEXT,
  [Language.ENGLISH]: ENGLISH_CONTEXT
};

export const ENGLISH_CONV_PROMPT =
  'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.';
export const FRENCH_CONV_PROMPT =
  "Ceci est une conversarion amicale entre un humain et une IA. L'IA est bavarde et fournit beaucoup de détail basé sur le contexte. Si l'IA ne connaît pas la réponse à une question, elle reconnaît sincèrement ne pas savoir.";

export const CONVERSATION_PROMPT: Record<Language, string> = {
  [Language.FRENCH]: FRENCH_CONV_PROMPT,
  [Language.ENGLISH]: ENGLISH_CONV_PROMPT
};
