import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityEntity } from '../../common/entities/BaseEntity.entity';
import { Role } from './role-user.entity';

@Entity()
export class User extends BaseEntityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  refresh_token: string;

  @ManyToOne(() => Role, (role) => role.users, { cascade: true })
  role: Role;

  @Column({
    default: 2,
    nullable: true,
  })
  roleId: number;
}
