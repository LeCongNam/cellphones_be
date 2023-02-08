import { IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { Optional } from '@nestjs/common';
import { BaseEntityEntity } from '../../common/entities/BaseEntity.entity';

// Validate dữ liệu trong function controller
export class CreateProductDto extends BaseEntityEntity {
  @Optional()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  thumbnail: string;

  @IsString()
  description: string;

  @IsString()
  brand: string;

  @IsString()
  category: string;
}
