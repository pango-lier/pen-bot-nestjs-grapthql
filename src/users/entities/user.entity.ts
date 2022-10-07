import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { length: 191, unique: true })
  name: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column({ length: 128, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  rememberToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column('bool', { default: true })
  active?: boolean;

  @ManyToOne(() => Role, (role) => role.user)
  roles: Role[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
