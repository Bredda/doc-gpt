import { Component, OnInit } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode
} from 'primeng/api';
import { ProjectService } from '../services/project.service';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-projec-manager',
  templateUrl: './projec-manager.component.html',
  styleUrls: ['./projec-manager.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProjecManagerComponent implements OnInit {
  visible: boolean = false;
  selectedNode!: any;
  newProjectName = '';
  newChatName = '';
  createProjectVisible = false;
  createChatVisible = false;
  datas: TreeNode[] = [];
  items: MenuItem[] = [];
  languages = [
    { id: 0, name: 'English' },
    { id: 1, name: 'Français' }
  ];
  selectedLanguage = { id: 0, name: 'English' };
  selectedModel = { id: 0, name: 'gpt-3.5-turbo' };
  models = [
    { id: 0, name: 'gpt-3.5-turbo' },
    { id: 1, name: 'gpt4' }
  ];
  currentProjectId = undefined;
  currentChatId = undefined;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private chatService: ChatService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    //On écoute la navigation pour changement projet/chat
    //Permet de savoir où l'on est pour expand le tree et navigation auto sur create/delete
    this.navigationService.onNavigationChange().subscribe((v) => {
      this.currentProjectId = v[0];
      this.currentChatId = v[1];
    });
    // On écoute le publication de la liste de sprojets + chats associés pour refresh la vue (init/création/suppression)
    this.projectService.onProjectListChange().subscribe((projects) => {
      const pjs: TreeNode[] = [];
      projects.forEach((p) => {
        let children: TreeNode[] = [];
        p.chats.forEach((c) => {
          const newChildrenNode = { label: c.name, data: c };
          children.push({
            ...newChildrenNode,
            expanded: this.isAutoExpanded(newChildrenNode)
          });
        });
        const newRoot = { label: p.name, children: children, data: p };
        pjs.push({ ...newRoot, expanded: this.isAutoExpanded(newRoot) });
      });
      this.datas = pjs;
    });
  }

  isAutoExpanded(t: TreeNode): boolean {
    return (
      t.children !== undefined && t.data.id === Number(this.currentProjectId)
    );
  }

  selectedIsProject() {
    return this.selectedNode.parent === undefined;
  }
  selecedIsChat() {
    return !this.selectedIsProject();
  }

  deleteProject() {
    this.confirmationService.confirm({
      message: `Etes-vous sur de vouloir supprimer le projet <strong>${this.selectedNode.data.name}</strong> ?`,
      header: 'Suppression du projet',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.projectService
          .deleteProject(this.selectedNode.data)
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Projet supprimé'
            });
            if (this.selectedNode.data.id === Number(this.currentProjectId))
              this.router.navigate(['']);
          });
      },
      reject: (type: ConfirmEventType) => {}
    });
  }

  onCancelCreate() {
    this.createProjectVisible = false;
    this.newProjectName = '';
  }
  onConfirmCreate() {
    this.projectService
      .createNewProject(this.newProjectName)
      .subscribe((projects) => {
        this.newProjectName = '';
        this.createProjectVisible = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Projet créé'
        });
        this.router.navigate(['project', projects[projects.length - 1].id]);
      });
  }

  onCancelCreateChat() {
    this.createChatVisible = false;
    this.newChatName = '';
  }
  onConfirmCreateChat() {
    this.chatService
      .createNewChat(this.selectedNode.data.id, {
        name: this.newChatName,
        settings: { model: this.selectedModel, language: this.selectedLanguage }
      })
      .subscribe((projects) => {
        this.newChatName = '';
        this.createChatVisible = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Nouvelle conversation créée'
        });

        const targetProject = projects.find(
          (p) => p.id === this.selectedNode.data.id
        );
        if (targetProject !== undefined) {
          const targetChat =
            targetProject.chats[targetProject.chats.length - 1];
          this.router.navigate([
            'project',
            targetProject.id,
            'chat',
            targetChat.id
          ]);
        }
      });
  }

  deleteChat() {
    this.confirmationService.confirm({
      message: `Etes-vous sur de vouloir supprimer la conversation <strong>${this.selectedNode.data.name}</strong> ?`,
      header: 'Suppression de la conversation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.chatService
          .deleteChat(
            this.selectedNode.parent.data.id,
            this.selectedNode.data.id
          )
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Conversation supprimée'
            });
            if (this.selectedNode.data.id === Number(this.currentChatId))
              this.router.navigate(['project', this.currentProjectId]);
          });
      },
      reject: (type: ConfirmEventType) => {}
    });
  }

  onContext() {
    if (this.selectedIsProject()) {
      this.items = [
        {
          label: 'Charger',
          icon: 'pi pi-fw pi-sync',
          command: () =>
            this.router.navigate(['project', this.selectedNode.data.id])
        },
        {
          label: 'Nouvelle conversation',
          icon: 'pi pi-fw pi-comments',
          command: () => (this.createChatVisible = true)
        },
        {
          label: 'Renommer',
          icon: 'pi pi-fw pi-pencil'
        },
        {
          label: 'Supprimer',
          icon: 'pi pi-fw pi-trash',
          command: () => this.deleteProject()
        }
      ];
    } else {
      this.items = [
        {
          label: 'Ouvrir',
          icon: 'pi pi-fw pi-sync',
          command: () =>
            this.router.navigate([
              'project',
              this.selectedNode.parent.data.id,
              'chat',
              this.selectedNode.data.id
            ])
        },
        {
          label: 'Renommer',
          icon: 'pi pi-fw pi-pencil'
        },
        {
          label: 'Supprimer',
          icon: 'pi pi-fw pi-trash',
          command: () => this.deleteChat()
        }
      ];
    }
  }
}
