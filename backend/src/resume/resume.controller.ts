import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import pdf = require('pdf-parse');
import { PromptService } from '../prompt/prompt.service';
import { OpenAIService } from '../openai/openai.service';
import { OpenAiRole } from '../common/types';

@Controller('resume')
export class ResumeController {
  constructor(
    private promptService: PromptService,
    private OpenAIService: OpenAIService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createResume(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    // Step1. validate request
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    if (file.mimetype !== 'application/pdf') {
      throw new HttpException(
        'Only PDF files are supported',
        HttpStatus.BAD_REQUEST,
      );
    }

    const description = body.description;

    let resume;
    try {
      resume = await pdf(file.buffer);
    } catch (error) {
      console.log('err', error);
      throw new HttpException(
        'Failed to parse PDF file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const role: OpenAiRole = 'user';

    // Step2. Parse Job Description
    const JDPrompt = this.promptService.getJDPerserPrompt();
    const JDmessage = {
      role,
      content: `Here is the job description text: ${description}`,
    };
    const JDJson = await this.OpenAIService.generateChatResponse(JDPrompt, [
      JDmessage,
    ]);

    // Validate JDJson
    const requiredKeys = ['title', 'company_name'];
    try {
      const extractedJDJson =
        await this.OpenAIService.extractJsonContent(JDJson);
      this.OpenAIService.validateJSONKeys(extractedJDJson, requiredKeys);
    } catch (error) {
      console.log('Validation error:', error);
      throw new HttpException(
        `Please provide valid job description for analysis: ${error.message} `,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Step3. Parse Resume
    const resumePrompt = this.promptService.getResumePerserPrompt();
    const resumeMessage = {
      role,
      content: `Here is the resume text: ${resume.text}`,
    };
    const resumeJson = await this.OpenAIService.generateChatResponse(
      resumePrompt,
      [resumeMessage],
    );

    // Step4. Optimized Resume
    const optimizeResumePrompt = this.promptService.getOptimizeResumePrompt();
    const optimizeResumemessage = {
      role,
      content: `Here is the resume JSON content ${resumeJson} and job description JSON content: ${JDJson}`,
    };

    const optimizeResumeJson = await this.OpenAIService.generateChatResponse(
      optimizeResumePrompt,
      [optimizeResumemessage],
    );

    // Step5. Clean Optimized Resume to JSON
    const result =
      await this.OpenAIService.extractJsonContent(optimizeResumeJson);
    if (!result) {
      throw new HttpException(
        'Invalid JSON response from OpenAI, maybe my account is out of funds. :( Please please contact me !!! nmpyt21@gmail.com',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }
}
