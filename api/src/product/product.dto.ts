import { IsString, IsArray, IsOptional, IsInt } from "class-validator";

export class CreateProductRequest {
  @IsString()
  name: string;
  @IsString()
  descriptions: string;
  @IsArray()
  images: string[];

  @IsOptional()
  @IsInt()
  stock: number;

  @IsInt()
  unitPrice: number;
}

export class UpdateProductRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  descriptions?: string;
  
  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsInt()
  unitPrice?: number;
}

export class GetProductResponse {
  id: string;
  name: string;
  description?: string;
  images: string[];
}