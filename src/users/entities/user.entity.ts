import {
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsOptional,
  Length,
} from 'class-validator';

export class UserEntity {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @IsNotEmpty()
  @Length(1, 50)
  gender: string;

  @IsNotEmpty()
  @Length(1, 50)
  occupation: string;

  @IsOptional()
  @Length(1, 50)
  company: string | null;

  @IsNotEmpty()
  @Length(1, 15)
  whatsapp: string;

  @IsNotEmpty()
  @Length(1, 15)
  phone: string;

  @IsNotEmpty()
  @Length(1, 10)
  zip_code: string;

  @IsNotEmpty()
  @Length(1, 100)
  address: string;

  @IsNotEmpty()
  @Length(1, 50)
  district: string;

  @IsNotEmpty()
  @Length(1, 50)
  city: string;

  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @IsOptional()
  @Length(1, 100)
  complement: string | null;

  @IsOptional()
  photo_url: string | null;
}
