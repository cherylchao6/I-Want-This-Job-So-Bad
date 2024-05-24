import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { OpenAIModule } from '../openai/openai.module';
import { PromptModule } from '../prompt/prompt.module';

@Module({
  imports: [OpenAIModule, PromptModule],
  controllers: [ResumeController],
})
export class ResumeModule {}
