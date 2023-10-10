import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UploadModule } from './modules/upload/upload.module';
import { ImagesModule } from './modules/images/images.module';
import { CompaniesModule } from './companies/companies.module';
import { BirthdayModule } from './birthday/birthday.module';

@Module({
  imports: [UsersModule, UploadModule, ImagesModule, CompaniesModule, BirthdayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
