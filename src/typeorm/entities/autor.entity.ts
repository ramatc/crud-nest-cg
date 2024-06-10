import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Libro } from './libro.entity';

@Entity({ name: 'autores' })
export class Autor {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  dni: string;

  @Column()
  nacionalidad: string;

  @ManyToMany(() => Libro, (libro) => libro.autores)
  libros: Libro[];
}
