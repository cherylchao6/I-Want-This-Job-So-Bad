import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion } from 'openai/resources';
import { Message } from '../common/types';

@Injectable()
export class OpenAIService {
  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi({
      apiKey: process.env.OPEN_AI_SECRET_KEY,
      organization: process.env.API_ORG_ID,
    });
  }

  /**
   * Make a request to ChatGPT to generate a response based on a prompt and message history.
   * @param prompt - The prompt for the ChatGPT model
   * @param messages - An array of messages that chat with ChatGPT
   * @returns A string containing the generated response
   */
  async generateChatResponse(
    prompt: string,
    messages: Message[],
  ): Promise<string> {
    try {
      const completion: ChatCompletion =
        await this.openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            ...messages,
          ],
          temperature: 0.5,
          // max_tokens: 1000,
        });
      const [content] = completion.choices.map(
        (choice) => choice.message.content,
      );
      return content;
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }

  /**
   * Extracts a JSON object from a string that might include encapsulated JSON text.
   * The function first attempts to directly parse the string as JSON.
   * If that fails, it uses a regular expression to find text between specific markers
   * (```json and ```) and then attempts to parse it as JSON.
   *
   * @param data - The string input containing potential JSON text.
   * @returns A JSON object if parsing is successful; otherwise, returns null.
   */
  async extractJsonContent(data: string): Promise<any | null> {
    // First, try to parse the string directly as JSON
    try {
      return JSON.parse(data);
    } catch (directParseError) {
      console.warn(
        'Direct JSON parsing failed, attempting to extract JSON from Markdown:',
        directParseError,
      );
    }

    // Regular expression to find text between ```json and ``` markers, handling any kind of space characters including line endings
    const regex = /```json\s*([\s\S]*?)\s*```/;
    const matches = data.match(regex); // Execute the match operation

    if (matches && matches[1]) {
      // If a match is found, matches[1] will contain the JSON string
      try {
        const json = JSON.parse(matches[1]); // Convert the string to a JSON object
        return json; // Return the JSON object
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        return null; // Return null if parsing fails
      }
    } else {
      console.error('No JSON content found');
      return null; // Return null if no JSON content is found
    }
  }

  /**
   * Validates that a JSON object contains specified keys.
   * @param json - The JSON object to validate.
   * @param keys - An array of keys that must be present in the JSON object.
   * @throws Error - If any required key is missing, throws an exception.
   */
  validateJSONKeys(json: any, keys: string[]): void {
    for (const key of keys) {
      if (!(key in json)) {
        throw new Error(`Missing required field: ${key}`);
      }
    }
  }
}
