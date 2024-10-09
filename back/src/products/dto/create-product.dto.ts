import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional() // Torna a propriedade opcional
  @IsString() // Define que será uma string
  imageUrl?: string; // Propriedade imageUrl adicionada
}
