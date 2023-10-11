import { Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import supabase from 'src/database/superbase.config';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { data, error } = await supabase
        .from('company')
        .upsert([createCompanyDto]);

      if (error) {
        this.logger.error(
          'Erro ao cadrastar uma nova empresa no Superbase',
          error,
        );
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Erro ao criar um novo usuário:', error);
      throw new Error('Não foi possível criar um novo usuário.');
    }
  }

  async findAll() {
    const { data, error } = await supabase.from('company').select();
    if (error) {
      throw error;
    }
    return data;
  }

  async findOne(id: string) {
    try {
      const { data, error } = await supabase
        .from('company')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar o usuário no Superbase:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro interno ao buscar o usuário:', error);
      throw new Error('Não foi possível buscar o usuário.');
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const { data, error } = await supabase
        .from('company')
        .update(updateCompanyDto)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao atualizar o usuário no Superbase:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro interno ao atualizar o usuário:', error);
      throw new Error('Não foi possível atualizar o usuário.');
    }
  }

  async remove(id: string) {
    try {
      const { error } = await supabase.from('company').delete().eq('id', id);

      if (error) {
        console.error('Erro ao excluir o usuário no Superbase:', error);
        throw error;
      }

      return `Usuário com ID ${id} foi excluído com sucesso.`;
    } catch (error) {
      console.error('Erro interno ao excluir o usuário:', error);
      throw new Error('Não foi possível excluir o usuário.');
    }
  }
}
