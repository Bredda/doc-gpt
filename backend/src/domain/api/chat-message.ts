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
import { Chat } from './chat';
import { SourceDocument } from './source-document';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @Column()
  origin!: string;

  @ManyToOne((_type) => Chat, (chat: Chat) => chat.messages, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  chat!: Relation<Chat>;

  @OneToMany(() => SourceDocument, (source) => source.message, {
    eager: true
  })
  sources!: SourceDocument[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
