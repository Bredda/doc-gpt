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
import { Chat } from './chat';
import { ChatMessage } from './chat-message';
import { OriginalDocument } from './document';

@Entity()
export class SourceDocument {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  pageContent!: string;

  @Column()
  source!: string;

  @Column()
  originalDocId!: string;

  @Column()
  from!: number;

  @Column()
  to!: number;

  @ManyToOne(
    (_type) => ChatMessage,
    (message: ChatMessage) => message.sources,
    {
      onDelete: 'CASCADE'
    }
  )
  @JoinColumn()
  message!: Relation<ChatMessage>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
