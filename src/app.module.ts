import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Libro } from './typeorm/entities/libro.entity';
import { Autor } from './typeorm/entities/autor.entity';
import { Editorial } from './typeorm/entities/editorial.entity';
import { LibrosModule } from './libros/libros.module';
import { AutoresModule } from './autores/autores.module';
import { EditorialesModule } from './editoriales/editoriales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'crud_nest_cg',
      entities: [Libro, Autor, Editorial],
      synchronize: true,
    }),
    LibrosModule,
    EditorialesModule,
    AutoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
