import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UsersModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
