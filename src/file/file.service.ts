import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createFileDtos: CreateFileDto[]): Promise<File[]> {
    const files = createFileDtos.map((dto) =>
      this.fileRepository.create(dto),
    );
    return await this.fileRepository.save(files);
  }

  async findAll(): Promise<File[]> {
    return await this.fileRepository.find();
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }

  async update(id: string, updateFileDto: UpdateFileDto): Promise<File> {
    const file = await this.fileRepository.preload({
      id,
      ...updateFileDto,
    });
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return await this.fileRepository.save(file);
  }

  async remove(id: string): Promise<void> {
    const file = await this.findOne(id);
    await this.fileRepository.remove(file);
  }
}
