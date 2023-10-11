import { Injectable } from '@nestjs/common';
import supabase from 'src/database/superbase.config';
import { FileDTO } from './upload.dto';
const sharp = require('sharp');

@Injectable()
export class UploadService {
  async upload(file: FileDTO) {
    if (!file || !file.originalname || !file.buffer) {
      throw new Error('Invalid file object');
    }

    const resizedImageBuffer = await sharp(file.buffer)
      .resize({ width: 50, height: 50, fit: 'cover' })
      .toBuffer();

    console.log(resizedImageBuffer);

    const data = await supabase.storage
      .from('img_bucket')
      .upload(file.originalname, resizedImageBuffer, {
        upsert: true,
      });
    console.log(data);
    return data;
  }
}
