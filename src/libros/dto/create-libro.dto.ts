import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsDateString,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateLibroDto {
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  autoresIds: number[];

  @IsNumber()
  @IsNotEmpty()
  editorialId: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  categoriaLiteraria: string;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @Transform(({ value }) => new Date(value).toISOString(), {
    toClassOnly: true,
  })
  @IsDateString()
  @IsNotEmpty()
  fechaLanzamiento: Date;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
