import { Controller, Get } from '@nestjs/common';
import { BirthdayService } from './birthday.service';

@Controller('birthday')
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}

  @Get('send-greetings')
  async sendBirthdayGreetings() {
    await this.birthdayService.sendBirthdayGreetings();
    return { message: 'Parabéns enviado com sucesso!' };
  }
}
