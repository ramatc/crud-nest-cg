import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateEditorialDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'El CUIT debe ser un número de 11 dígitos.' })
  cuit: string;
}
