import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesService {
    private readonly logger;
    create(createCompanyDto: CreateCompanyDto): Promise<null>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<unknown>;
    remove(id: string): Promise<string>;
}
