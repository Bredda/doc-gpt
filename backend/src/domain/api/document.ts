import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Relation,
  OneToMany
} from 'typeorm';
import { Project } from './project';
import { Summary } from './summary';

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

  @OneToMany(() => Summary, (summary) => summary.document, {
    eager: true
  })
  summaries!: Summary[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
