import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{7,8}$/, {
    message: 'El DNI debe ser un número de 7 u 8 dígitos.',
  })
  dni: string;

  @IsString()
  @IsNotEmpty()
  nacionalidad: string;
}
