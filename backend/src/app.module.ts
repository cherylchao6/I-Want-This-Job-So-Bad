import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resume/resume.module';
import { OpenAIModule } from './openai/openai.module';
import { PromptModule } from './prompt/prompt.module';

@Module({
  imports: [ResumeModule, OpenAIModule, PromptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
