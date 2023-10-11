import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
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
export {};
