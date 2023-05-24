import { Repository } from 'sequelize-typescript';
import { Usuario } from './entities/usuario.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async login(user: LoginDto) {
    try {
      const data = await this.usuarioRepository.findOne({
        attributes: ['email'],
        where: { email: user.email },
      });
      bcrypt.compare(user.senha, data.senha, function (err, res) {
        return 'login realizado com sucesso';
      });
      return 'Erro no login';
    } catch (err) {
      throw new UnprocessableEntityException(`Acesso negado. ${err.message}`);
    }
  }
  async cadastrarUser(user) {
    try {
      user.senha = await bcrypt.hash(user.senha, 8);
      await this.usuarioRepository.create(user);
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }

  async userExists(user) {
    try {
      const userExists = await this.usuarioRepository.findOne({
        attributes: ['id', 'nome'],
        where: { nome: user.nome },
      });
      return userExists;
    } catch (err) {
      throw new Error(`não foi posível realizar a operacao ${err.message}`);
    }
  }
}
