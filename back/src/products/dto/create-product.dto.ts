import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString() // Removido o @IsOptional() para torná-lo obrigatório
  name: string;

  @IsString() // Removido o @IsOptional() para torná-lo obrigatório
  description: string;

  @IsNumber() // Removido o @IsOptional() para torná-lo obrigatório
  price: number;

  @IsOptional() // Isso pode ser opcional
  @IsString()
  imageUrl?: string;
}
