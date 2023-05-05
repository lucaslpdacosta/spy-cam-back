import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Pessoa } from '../../pessoa/entities/pessoa.entity';

@Table({ tableName: 'usuario' })
export class Usuario extends Model {
  @Column
  nome: string;

  @Column
  email: string;

  @Column
  senha: string;

  @HasMany(() => Pessoa)
  pessoas: Pessoa[];
}
