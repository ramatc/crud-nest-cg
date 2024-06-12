import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editorial } from 'src/typeorm/entities/editorial.entity';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@Injectable()
export class EditorialesService {
  constructor(
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
  ) {}

  create(createEditorialDto: CreateEditorialDto) {
    const newEditorial = this.editorialRepository.create(createEditorialDto);

    return this.editorialRepository.save(newEditorial);
  }

  findAll() {
    return this.editorialRepository.find();
  }

  async findOne(id: number) {
    const editorial = await this.editorialRepository.findOneBy({ id });

    if (!editorial)
      throw new NotFoundException(`La editorial #${id} no fue encontrada`);

    return editorial;
  }

  async update(id: number, updateEditorialDto: UpdateEditorialDto) {
    const editorial = await this.editorialRepository.findOneBy({ id });

    if (!editorial)
      throw new NotFoundException(`La editorial #${id} no fue encontrada`);

    this.editorialRepository.update({ id }, { ...updateEditorialDto });

    return {
      message: `La editorial #${id} ha sido actualizada exitosamente`,
      statusCode: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    const editorial = await this.editorialRepository.findOneBy({ id });

    if (!editorial)
      throw new NotFoundException(`La editorial #${id} no fue encontrada`);

    this.editorialRepository.delete({ id });

    return {
      message: `La editorial #${id} ha sido eliminada exitosamente`,
      statusCode: HttpStatus.OK,
    };
  }
}
