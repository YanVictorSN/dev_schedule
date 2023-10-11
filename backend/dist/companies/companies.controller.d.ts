import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto): Promise<null>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<unknown>;
    remove(id: string): Promise<string>;
}
