import { IsString, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
