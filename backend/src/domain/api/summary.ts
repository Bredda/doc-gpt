import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Relation,
  OneToMany,
  OneToOne
} from 'typeorm';
import { Chat } from './chat';
import { SourceDocument } from './source-document';
import { OriginalDocument } from './document';

@Entity()
export class Summary {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @ManyToOne((_type) => Chat, (chat: Chat) => chat.messages, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  chat!: Relation<Chat>;

  @ManyToOne(
    (_type) => OriginalDocument,
    (originalDocument: OriginalDocument) => originalDocument.summaries,
    {
      onDelete: 'CASCADE'
    }
  )
  document!: Relation<OriginalDocument>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
