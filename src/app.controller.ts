import { Controller, Get, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('')
  @Redirect(`http://localhost:8080/announcements`, 301)
  welcome() {}
}
