import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly logger;
    create(createUserDto: CreateUserDto): Promise<{
        status: number;
        error: string;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<unknown>;
    remove(id: string): Promise<string>;
}
