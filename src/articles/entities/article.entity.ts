import { ObjectType } from '@nestjs/graphql';
import { Link } from 'src/links/entities/link.entity';
import { Social } from 'src/socials/entities/social.entity';
import { Column, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ArticleStatusEnum } from './article-status.enum';

@ObjectType()
export class Article {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: "varchar", nullable: true })
  title?: string

  @Column({ type: "tinytext", nullable: true })
  description?: string

  @Column({ type: "text", nullable: true })
  content: string

  @Column({ type: 'enum', enum: ArticleStatusEnum, default: ArticleStatusEnum.NONE })
  status: ArticleStatusEnum

  @Column({ type: "boolean", default: true })
  active: boolean

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Social, (social) => social.articles, {
    nullable: true
  })
  social?: Social

  @OneToMany(() => Link, (link) => link.article, { nullable: true })
  links?: Link[]
}
