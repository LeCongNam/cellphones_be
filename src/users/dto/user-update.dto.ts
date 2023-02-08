import { IsUUID } from 'class-validator';
import { BaseEntityEntity } from '../../common/entities/BaseEntity.entity';

export class UserUpdateDto extends BaseEntityEntity {
  @IsUUID()
  id: string;

  username?: string;

  email?: string;

  password: string;

  role: number;
}
