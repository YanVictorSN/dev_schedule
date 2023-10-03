import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import supabase from '../database/superbase.config';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    try {
      const { data, error } = await supabase
        .from('people')
        .upsert([createUserDto]);

      if (error) {
        this.logger.error('Erro ao criar um novo usuário no Superbase', error);
        throw error;
      }

      return data;
    } catch (error) {
      this.logger.error('Erro ao criar um novo usuário:', error);
      throw new Error('Não foi possível criar um novo usuário.');
    }
  }

  async findAll() {
    const { data, error } = await supabase.from('people').select();
    if (error) {
      throw error;
    }
    return data;
  }

  async findOne(id: string) {
    try {
      const { data, error } = await supabase
        .from('people')
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { data, error } = await supabase
        .from('people')
        .update(updateUserDto)
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
      const { error } = await supabase.from('people').delete().eq('id', id);

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
