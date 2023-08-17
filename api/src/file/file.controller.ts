import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { GetFileDto } from './file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
  constructor(private readonly filesService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any): Promise<GetFileDto> {
    const result = await this.filesService.saveFile(file);

    return result;
  }
}
