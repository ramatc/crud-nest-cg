import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from 'src/typeorm/entities/autor.entity';
import { CreateAutorDto } from '../dto/create-autor.dto';
import { UpdateAutorDto } from '../dto/update-autor.dto';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  create(createAutorDto: CreateAutorDto) {
    const newAutor = this.autorRepository.create(createAutorDto);

    return this.autorRepository.save(newAutor);
  }

  findAll() {
    return this.autorRepository.find();
  }

  async findOne(id: number) {
    const autor = await this.autorRepository.findOneBy({ id });

    if (!autor)
      throw new NotFoundException(`El autor #${id} no fue encontrado`);

    return autor;
  }

  async update(id: number, updateAutorDto: UpdateAutorDto) {
    const autor = await this.autorRepository.findOneBy({ id });

    if (!autor)
      throw new NotFoundException(`El autor #${id} no fue encontrado`);

    return this.autorRepository.update({ id }, { ...updateAutorDto });
  }

  async remove(id: number) {
    const autor = await this.autorRepository.findOneBy({ id });

    if (!autor)
      throw new NotFoundException(`El autor #${id} no fue encontrado`);

    return this.autorRepository.delete({ id });
  }
}
