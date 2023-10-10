import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import supabase from 'src/database/superbase.config';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BirthdayService {
  constructor() {}

  async sendBirthdayGreetings() {
    const today = new Date();
    const { data, error } = await supabase
      .from('people')
      .select()
      .eq('birthdate', today.toISOString().split('T')[0]);

    if (error) {
      throw new Error(error.message);
    }

    if (data && data.length > 0) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      for (const person of data) {
        const msg = {
          to: person.email, // Use o e-mail da pessoa
          from: process.env.SENDGRID_SENDER_EMAIL,
          subject: 'Feliz Aniversário!',
          text: `Feliz aniversário, ${person.name}`,
        };

        try {
          await sgMail.send(msg);
          console.log(`E-mail enviado com sucesso para ${person.name}`);
        } catch (error) {
          console.error(`Erro ao enviar e-mail para ${person.name}:`, error);
        }
      }
    }
  }
}
