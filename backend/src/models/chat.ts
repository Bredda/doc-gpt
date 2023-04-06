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
  } from "typeorm";
  import { ChatMessage } from "./chat-message.js";
import { ChatSettings } from "./chat-settings.js";
import { Project } from "./project.js";
  
  @Entity()
  export class Chat {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;

    @OneToOne(() => ChatSettings)
    @JoinColumn()
    settings!: Relation<ChatSettings>

    @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.chat)
    messages!: ChatMessage[]

    @ManyToOne((_type) => Project, (project: Project) => project.chats, { onDelete: 'CASCADE' })
    @JoinColumn()
    project!: Relation<Project>;

    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }