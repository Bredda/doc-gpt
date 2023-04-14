import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Relation
} from 'typeorm';
import { User } from './user';
import { Chat } from './chat';
import { OriginalDocument } from './document';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  userId!: string;
  @ManyToOne((_type) => User, (user: User) => user.projects)
  @JoinColumn()
  user!: Relation<User>;

  @OneToMany((_type) => Chat, (chat: Chat) => chat.project)
  chats!: Array<Chat>;

  @OneToMany(
    (_type) => OriginalDocument,
    (originalDocuments: OriginalDocument) => originalDocuments.project
  )
  originalDocuments!: Array<OriginalDocument>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
