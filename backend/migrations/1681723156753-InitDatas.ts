import { MigrationInterface, QueryRunner } from 'typeorm';
import { Chat, ChatSettings, Project, User } from '../src/domain/api';
import { ChatType, Language, LlmModel } from '../src/domain/api/enum';

export class InitDatas1681723156753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.email = 'toto@email.fr';
    user.password = 'toto@email.fr';
    user.hashPassword();

    const project = new Project();
    project.name = 'Projet de test';

    const chat = new Chat();
    chat.name = 'Chat conv fr 3.5';
    const settings = new ChatSettings();
    settings.language = Language.FRENCH;
    settings.model = LlmModel.GPT3_5_TURBO;
    settings.type = ChatType.CONVERSATIONNAL;

    const settingSaved = await queryRunner.manager.save(ChatSettings, settings);
    chat.settings = settingSaved;
    const chatSaved = await queryRunner.manager.save(Chat, chat);

    const chat2 = new Chat();
    chat2.name = 'Chat conv en 3.5';
    const settings2 = new ChatSettings();
    settings2.language = Language.ENGLISH;
    settings2.model = LlmModel.GPT3_5_TURBO;
    settings2.type = ChatType.CONVERSATIONNAL;
    const settingSaved2 = await queryRunner.manager.save(
      ChatSettings,
      settings2
    );
    chat2.settings = settingSaved2;
    const chatSaved2 = await queryRunner.manager.save(Chat, chat2);

    project.chats = [chatSaved, chatSaved2];
    const projectSaved = await queryRunner.manager.save(Project, project);

    user.projects = [projectSaved];
    await queryRunner.manager.save(User, user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
