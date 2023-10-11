"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const superbase_config_1 = require("../database/superbase.config");
let UsersService = UsersService_1 = class UsersService {
    constructor() {
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(createUserDto) {
        try {
            const { data, error } = await superbase_config_1.default
                .from('people')
                .upsert([createUserDto]);
            if (error) {
                if (error.message.includes('duplicate key value violates unique constraint')) {
                    const errorMessage = 'Contato já existe com este e-mail.';
                    return {
                        status: 409,
                        error: errorMessage,
                    };
                }
                else {
                    this.logger.error('Erro ao criar um novo usuário no Superbase', error);
                    throw error;
                }
            }
            return data;
        }
        catch (error) {
            this.logger.error('Erro ao criar um novo usuário:', error);
            throw new Error('Não foi possível criar um novo usuário.');
        }
    }
    async findAll() {
        const { data, error } = await superbase_config_1.default.from('people').select();
        if (error) {
            throw error;
        }
        return data;
    }
    async findOne(id) {
        try {
            const { data, error } = await superbase_config_1.default
                .from('people')
                .select()
                .eq('id', id)
                .single();
            if (error) {
                console.error('Erro ao buscar o usuário no Superbase:', error);
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error('Erro interno ao buscar o usuário:', error);
            throw new Error('Não foi possível buscar o usuário.');
        }
    }
    async update(id, updateUserDto) {
        try {
            const { data, error } = await superbase_config_1.default
                .from('people')
                .update(updateUserDto)
                .eq('id', id)
                .single();
            if (error) {
                console.error('Erro ao atualizar o usuário no Superbase:', error);
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error('Erro interno ao atualizar o usuário:', error);
            throw new Error('Não foi possível atualizar o usuário.');
        }
    }
    async remove(id) {
        try {
            const { error } = await superbase_config_1.default.from('people').delete().eq('id', id);
            if (error) {
                console.error('Erro ao excluir o usuário no Superbase:', error);
                throw error;
            }
            return `Usuário com ID ${id} foi excluído com sucesso.`;
        }
        catch (error) {
            console.error('Erro interno ao excluir o usuário:', error);
            throw new Error('Não foi possível excluir o usuário.');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map