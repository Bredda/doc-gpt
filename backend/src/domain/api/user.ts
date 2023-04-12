import { Length, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique
} from 'typeorm';
import { Project } from './project.js';
import bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @Length(4, 100)
  @IsNotEmpty()
  password!: string;

  @Column()
  @IsNotEmpty()
  email!: string;

  @Column()
  @IsNotEmpty()
  role!: string;

  @OneToMany((_type) => Project, (project: Project) => project.user)
  projects!: Array<Project>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
