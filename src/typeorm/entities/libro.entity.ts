import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Autor } from './autor.entity';
import { Editorial } from './editorial.entity';

@Entity({ name: 'libros' })
export class Libro {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToMany(() => Autor, (autor) => autor.libros)
  @JoinTable()
  autores: Autor[];

  @ManyToOne(() => Editorial, (editorial) => editorial.libros)
  editorial: Editorial;

  @Column()
  titulo: string;

  @Column()
  categoriaLiteraria: string;

  @Column('decimal')
  precio: number;

  @Column()
  fechaLanzamiento: Date;

  @Column()
  descripcion: string;
}
