import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  legal_name: string;
  trade_name: string;
  email: string;
  cnpj: string;
  contact_person: string;
  whatsapp: string;
  phone: string;
  zip_code: string;
  address: string;
  city: string;
  state: string;
  complement: string;
  logo_url: string;
}
