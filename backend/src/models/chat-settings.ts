import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ChatType, Language, LlmModel } from './enum.js';

@Entity()
export class ChatSettings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.ENGLISH
  })
  language!: number;

  @Column({
    type: 'enum',
    enum: LlmModel,
    default: LlmModel.GPT3_5_TURBO
  })
  model!: number;

  @Column({
    type: 'enum',
    enum: ChatType,
    default: ChatType.CONVERSATIONNAL
  })
  type!: number;
}
