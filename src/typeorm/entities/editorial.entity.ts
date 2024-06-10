import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Libro } from './libro.entity';

@Entity({ name: 'editoriales' })
export class Editorial {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  cuit: string;

  @OneToMany(() => Libro, (libro) => libro.editorial)
  libros: Libro[];
}
