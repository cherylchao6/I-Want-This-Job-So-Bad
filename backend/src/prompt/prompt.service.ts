import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PromptService {
  private basePath: string = join(__dirname, 'prompts');

  private loadPrompt(fileName: string): string {
    const filePath = join(this.basePath, fileName);
    try {
      return readFileSync(filePath, 'utf8');
    } catch (error) {
      console.error('Error loading prompt file:', error);
      throw new Error('Unable to load prompt');
    }
  }

  public getResumePerserPrompt(): string {
    return this.loadPrompt('resumeParser.txt');
  }

  public getJDPerserPrompt(): string {
    return this.loadPrompt('JDParser.txt');
  }

  public getOptimizeResumePrompt(): string {
    return this.loadPrompt('optimizeResume.txt');
  }

  public getMakeResumePrompt(): string {
    return this.loadPrompt('makeReume.txt');
  }
}
