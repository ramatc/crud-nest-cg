import { Module } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { LibrosController } from './libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from 'src/typeorm/entities/libro.entity';
import { Editorial } from 'src/typeorm/entities/editorial.entity';
import { Autor } from 'src/typeorm/entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libro, Editorial, Autor])],
  controllers: [LibrosController],
  providers: [LibrosService],
})
export class LibrosModule {}
