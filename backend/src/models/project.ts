import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Relation,
  } from "typeorm";
  import { ChatMessage } from "./chat-message.js";
  import { User } from "./user.js";
import { Chat } from "./chat.js";
import { OriginalDocument } from "./document.js";
  
  @Entity()
  export class Project {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;

  
    @Column({ nullable: true })
    userId!: number;
    @ManyToOne((_type) => User, (user: User) => user.projects)
    @JoinColumn()
    user!: Relation<User>;
  
    @OneToMany((_type) => Chat, (chat: Chat) => chat.project)
    chats!: Array<Chat>;
  
    @OneToMany((_type) => OriginalDocument, (originalDocuments: OriginalDocument) => originalDocuments.project)
    originalDocuments!: Array<OriginalDocument>;

    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }