
import { IsEnum } from 'class-validator';

export class UploadFileDto {
}

export class GetFileDto {
  id: string;
  filename: string;
  type: string;
  size: number;
  url: string;
  created: Date;
}
