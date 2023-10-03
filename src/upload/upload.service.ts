import { Injectable } from '@nestjs/common';
import supabase from 'src/database/superbase.config';
import { FileDTO } from './upload.dto';

@Injectable()
export class UploadService {
  async upload(file: FileDTO) {
    const data = await supabase.storage
      .from('img_bucket')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });
    console.log(data);
    return data;
  }
}
