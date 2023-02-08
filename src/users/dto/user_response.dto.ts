import { BaseEntityEntity } from '../../common/entities/BaseEntity.entity';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto extends BaseEntityEntity {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  email: string;

  @Expose()
  role: number;
}
