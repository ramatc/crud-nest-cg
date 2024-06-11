import { Test, TestingModule } from '@nestjs/testing';
import { AutoresService } from './autores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutorDto } from '../dto/create-autor.dto';
import { UpdateAutorDto } from '../dto/update-autor.dto';
import { Autor } from '../../typeorm/entities/autor.entity';

describe('AutoresService', () => {
  let service: AutoresService;
  let autorRepository: Repository<Autor>;

  const AUTOR_REPOSITORY_TOKEN = getRepositoryToken(Autor);

  const autorArray = [
    {
      nombre: 'Pedro',
      apellido: 'Gonzalez',
      dni: '34877404',
      nacionalidad: 'Peruano',
    },
    {
      nombre: 'Mario',
      apellido: 'Ruiz',
      dni: '25786574',
      nacionalidad: 'Chileno',
    },
  ];

  const autor = {
    nombre: 'Ramiro',
    apellido: 'Lopez',
    dni: '43877404',
    nacionalidad: 'Argentino',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutoresService,
        {
          provide: AUTOR_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue(autorArray),
            findOneBy: jest.fn().mockResolvedValue(autor),
            create: jest.fn().mockReturnValue(autor),
            save: jest.fn().mockResolvedValue(autor),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<AutoresService>(AutoresService);
    autorRepository = module.get<Repository<Autor>>(AUTOR_REPOSITORY_TOKEN);
  });

  it('service deberia estar definido', () => {
    expect(service).toBeDefined();
  });

  it('autorRepository deberia estar definido', () => {
    expect(autorRepository).toBeDefined();
  });

  describe('create', () => {
    it('deberia crear un nuevo autor', async () => {
      const createAutorDto: CreateAutorDto = {
        nombre: 'Ramiro',
        apellido: 'Lopez',
        dni: '43877404',
        nacionalidad: 'Argentino',
      };

      await service.create(createAutorDto);

      expect(autorRepository.create).toHaveBeenCalledWith(createAutorDto);
      expect(autorRepository.save).toHaveBeenCalledWith(autor);
    });
  });

  describe('findAll', () => {
    it('deberia devolver un array de autores', async () => {
      const autors = await service.findAll();

      expect(autors).toEqual(autorArray);
    });
  });

  describe('findOne', () => {
    it('deberia devolver un autor', async () => {
      const autor = await service.findOne(1);

      expect(autor).toEqual(autor);
      expect(autorRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('deberia actualizar un autor', async () => {
      const updateAutorDto: UpdateAutorDto = {
        nombre: 'Miguel',
        apellido: 'Hernandez',
        dni: '36987032',
        nacionalidad: 'Peruano',
      };

      await service.update(1, updateAutorDto);

      expect(autorRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(autorRepository.update).toHaveBeenCalledWith(
        { id: 1 },
        updateAutorDto,
      );
    });
  });

  describe('remove', () => {
    it('deberia eliminar un autor', async () => {
      await service.remove(1);

      expect(autorRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(autorRepository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
