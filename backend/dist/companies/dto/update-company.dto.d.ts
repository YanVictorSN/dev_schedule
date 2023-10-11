import { CreateCompanyDto } from './create-company.dto';
declare const UpdateCompanyDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCompanyDto>>;
export declare class UpdateCompanyDto extends UpdateCompanyDto_base {
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
export {};
