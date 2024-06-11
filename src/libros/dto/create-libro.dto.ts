import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsDateString,
  ArrayNotEmpty,
} from 'class-validator';
import { transformDate } from 'src/helpers/transformDate';

export class CreateLibroDto {
  @IsArray()
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

  @Transform(({ value }) => transformDate(value), { toClassOnly: true })
  @IsDateString()
  @IsNotEmpty()
  fechaLanzamiento: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
