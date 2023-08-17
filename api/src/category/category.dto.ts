import { IsString, IsArray, IsOptional } from "class-validator";

export class CreateCategoryRequest {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
}

export class UpdateCategoryRequest{
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
  
  @IsOptional()
  @IsString()
  image: string;
}

export class GetCategoryResponse {
  id: string;
  name: string;
  description: string;
  image: string;
  created: Date;
}
