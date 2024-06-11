import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibrosController {
  constructor(private readonly libroService: LibrosService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.libroService.create(createLibroDto);
  }

  @Get()
  findAll(@Query('categoria') categoria?: string) {
    return this.libroService.findAll(categoria);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibroDto: UpdateLibroDto,
  ) {
    return this.libroService.update(id, updateLibroDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.remove(id);
  }
}
