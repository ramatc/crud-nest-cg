import { Module } from '@nestjs/common';
import { EditorialesService } from './editoriales.service';
import { EditorialesController } from './editoriales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from 'src/typeorm/entities/editorial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial])],
  controllers: [EditorialesController],
  providers: [EditorialesService],
})
export class EditorialesModule {}
