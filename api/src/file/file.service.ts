import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';
import { UploadFileDto, GetFileDto } from './file.dto';
import { File } from './file.entity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { uuid } from 'uuidv4';

@Injectable()
export class FileService {
  private s3Client: S3Client;

  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });
  }

  async saveFile(file: any): Promise<GetFileDto> {
    const id = uuid();
    try {
      const params = {
        Body: file.buffer,
        Bucket: process.env.AWS_S3_FILES_BUCKET,
        Key: id,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);

      const entity = this.filesRepository.create({
        id,
        type: file.mimetype,
        filename: file.originalname,
        size: file.size,
        url: `${process.env.FILE_BASE_URL}/${id}`,
      });

      return this.filesRepository.save(entity);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
