import { Module } from '@nestjs/common';
import { AutoresController } from './controllers/autores.controller';
import { AutoresService } from './services/autores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from 'src/typeorm/entities/autor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutoresController],
  providers: [AutoresService],
})
export class AutoresModule {}
