import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Libro } from 'src/typeorm/entities/libro.entity';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { CreateLibroDto } from './dto/create-libro.dto';
import { Autor } from 'src/typeorm/entities/autor.entity';
import { Editorial } from 'src/typeorm/entities/editorial.entity';

@Injectable()
export class LibrosService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
  ) {}

  async create(createLibroDto: CreateLibroDto) {
    const { editorialId, autoresIds, ...libroData } = createLibroDto;

    const editorial = await this.editorialRepository.findOneBy({
      id: editorialId,
    });

    if (!editorial) {
      throw new NotFoundException(
        `La editorial #${editorialId} no fue encontrada`,
      );
    }

    const autores = await this.autorRepository.findBy({ id: In(autoresIds) });

    if (autores.length !== autoresIds.length) {
      throw new NotFoundException('Uno o más autores no fueron encontrados');
    }

    const newLibro = this.libroRepository.create({
      ...libroData,
      editorial,
      autores,
    });

    return this.libroRepository.save(newLibro);
  }

  async findAll(query) {
    const where: any = {};

    if (query?.categoria) {
      where.categoriaLiteraria = query.categoria;
    }

    const take = query.take || 5;
    const currentPage = query?.page || 1;
    const skip = take * (currentPage - 1);

    const [result, total] = await this.libroRepository.findAndCount({
      where,
      take,
      skip,
    });

    return {
      data: result,
      count: total,
      currentPage,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(id: number) {
    const libro = await this.libroRepository.findOne({
      where: { id },
      relations: ['autores', 'editorial'],
    });

    if (!libro)
      throw new NotFoundException(`El libro #${id} no fue encontrado`);

    return libro;
  }

  async update(id: number, updateLibroDto: UpdateLibroDto) {
    const { editorialId, autoresIds, ...libroData } = updateLibroDto;

    const libro = await this.libroRepository.findOne({
      where: { id },
      relations: ['autores', 'editorial'],
    });

    if (!libro) {
      throw new NotFoundException(`El libro #${id} no fue encontrado`);
    }

    if (editorialId) {
      const editorial = await this.editorialRepository.findOne({
        where: { id: editorialId },
      });

      if (!editorial) {
        throw new NotFoundException('La editorial proporcionada no existe');
      }

      libro.editorial = editorial;
    }

    if (autoresIds) {
      const autores = await this.autorRepository.findBy({ id: In(autoresIds) });

      if (autores.length !== autoresIds.length) {
        throw new NotFoundException(
          'Uno o más autores proporcionados no existen',
        );
      }

      libro.autores = autores;
    }

    const updatedLibro = { ...libro, ...libroData };

    this.libroRepository.save(updatedLibro);

    return {
      message: `El libro #${id} ha sido actualizado exitosamente`,
      statusCode: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    const libro = await this.libroRepository.findOneBy({ id });

    if (!libro)
      throw new NotFoundException(`El libro #${id} no fue encontrado`);

    this.libroRepository.delete({ id });

    return {
      message: `El libro #${id} ha sido eliminado exitosamente`,
      statusCode: HttpStatus.OK,
    };
  }
}
