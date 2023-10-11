import { BirthdayService } from './birthday.service';
export declare class BirthdayController {
    private readonly birthdayService;
    constructor(birthdayService: BirthdayService);
    sendBirthdayGreetings(): Promise<{
        message: string;
    }>;
}
