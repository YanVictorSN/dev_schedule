import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  email: string;
  birthdate: string;
  gender: string;
  occupation: string;
  company: string;
  whatsapp: string;
  phone: string;
  zip_code: string;
  address: string;
  district: string;
  city: string;
  state: string;
  complement: string;
  photo_url: string;
}
