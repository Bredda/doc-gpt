import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Relation
} from 'typeorm';
import { Project } from './project';

@Entity()
export class OriginalDocument {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  originalname!: string;

  @Column()
  encoding!: string;

  @Column()
  mimetype!: string;

  @Column()
  path!: string;

  @Column()
  size!: number;

  @ManyToOne(
    (_type) => Project,
    (project: Project) => project.originalDocuments,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn()
  project!: Relation<Project>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
