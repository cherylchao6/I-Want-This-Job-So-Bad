export type OpenAiRole = 'system' | 'user' | 'assistant';

export type Message = {
  role: OpenAiRole;
  content: string;
};
