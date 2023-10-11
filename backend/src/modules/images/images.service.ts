import { Injectable } from '@nestjs/common';
import supabase from 'src/database/superbase.config';

@Injectable()
export class ImagesService {
  async getAllImageUrls() {
    const { data } = await supabase.storage.from('img_bucket').list();

    const listImages = [];

    for (const elemento of data) {
      const { data } = await supabase.storage
        .from('img_bucket')
        .getPublicUrl(elemento.name);

      const imageInfo = {
        name: elemento.name,
        url: data,
      };
      listImages.push(imageInfo);
    }
    const listImagesJSON = JSON.stringify(listImages);

    return listImagesJSON;
  }
}
