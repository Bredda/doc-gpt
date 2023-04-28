import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Relation,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ChatMessage } from './chat-message';
import { ChatSettings } from './chat-settings';
import { Project } from './project';
import { OriginalDocument } from './document';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToOne(() => ChatSettings)
  @JoinColumn()
  settings!: Relation<ChatSettings>;

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.chat)
  messages!: ChatMessage[];

  @ManyToOne((_type) => Project, (project: Project) => project.chats, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  project!: Relation<Project>;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => OriginalDocument)
  @JoinTable()
  documents!: OriginalDocument[];

  @UpdateDateColumn()
  updatedAt!: Date;
}
