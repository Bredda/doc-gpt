import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Language, LlmModel } from './enum.js';

@Entity()
export class ChatSettings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.ENGLISH
  })
  language!: string;

  @Column({
    type: 'enum',
    enum: LlmModel,
    default: LlmModel.GPT3_5_TURBO
  })
  model!: string;
}
