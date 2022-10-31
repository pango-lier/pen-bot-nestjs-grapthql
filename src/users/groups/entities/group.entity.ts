import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Account } from 'src/users/accounts/entities/account.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { GroupEnum } from './group.enum';

@InputType("GroupInput")
@ObjectType()
@Entity()
export class Group {
  @PrimaryColumn({ type: "bigint" })
  id: number

  @Column({ type: "varchar" })
  name: string

  @Column({ type: "varchar", nullable: true })
  secrectName?: string

  @Column({ type: "varchar", nullable: true })
  secrectKey?: string

  @Column({ type: "enum", enum: GroupEnum, default: GroupEnum.NONE })
  groupType: GroupEnum

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @OneToOne(() => Account, (account) => account.group)
  accounts?: Account[]
}
