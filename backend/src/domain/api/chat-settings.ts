import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  Relation
} from 'typeorm';
import { ChatType, Language, LlmModel } from './enum';

@Entity()
export class ChatSettings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.ENGLISH
  })
  language!: Language;

  @Column({
    type: 'enum',
    enum: LlmModel,
    default: LlmModel.GPT3_5_TURBO
  })
  model!: LlmModel;

  @Column({
    type: 'enum',
    enum: ChatType,
    default: ChatType.CONVERSATIONNAL
  })
  type!: ChatType;
}
