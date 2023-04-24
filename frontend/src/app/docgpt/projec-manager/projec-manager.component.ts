import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode
} from 'primeng/api';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { ContextService } from '../services/context.service';
import { Project } from '../api/project';
import { ChatType, Languages, Models } from '../api/settings';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-projec-manager',
  templateUrl: './projec-manager.component.html',
  styleUrls: ['./projec-manager.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProjecManagerComponent implements OnInit {
  visible = false;
  selectedNode!: TreeNode;
  newName = '';
  createProjectVisible = false;
  createChatVisible = false;
  datas: TreeNode[] = [];
  items: MenuItem[] = [];
  languages = Languages;
  selectedLanguage = Languages[0];
  selectedModel = Models[0];
  models = Models;
  types = ChatType;
  selectedType = ChatType[0];
  currentProjectId: string | undefined;
  currentChatId: string | undefined;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private chatService: ChatService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private contextService: ContextService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.contextService.listenToDataChange().subscribe((v) => {
      this.datas = this.transformProjectListToNode(v[0]);
      this.currentProjectId = v[1]?.id;
      this.currentChatId = v[2]?.id;
    });
    this.uiService
      .listenChatDiagOpen()
      .subscribe((v) => (this.createChatVisible = true));
  }

  private transformProjectListToNode(projects: Project[]): TreeNode[] {
    const pjs: TreeNode[] = [];
    projects.forEach((p) => {
      const children: TreeNode[] = [];
      p.chats.forEach((c) => {
        const newChildrenNode = { label: c.name, data: c };
        children.push({
          ...newChildrenNode,
          expanded: this.isAutoExpanded(newChildrenNode),
          partialSelected: this.isAutoExpanded(newChildrenNode),
          icon: 'pi pi-comments'
        });
      });
      const newRoot = { label: p.name, children: children, data: p };
      pjs.push({
        ...newRoot,
        expanded: this.isAutoExpanded(newRoot),
        partialSelected: this.isAutoExpanded(newRoot),
        icon: 'pi pi-folder-open'
      });
    });
    return pjs;
  }

  isAutoExpanded(t: TreeNode): boolean {
    return t.children !== undefined && t.data.id === this.currentProjectId;
  }

  selectedIsProject() {
    return this.selectedNode.parent === undefined;
  }
  selecedIsChat() {
    return !this.selectedIsProject();
  }

  navigateToSelectedNode() {
    if (this.selectedIsProject())
      this.router.navigate(['project', this.selectedNode.data.id]);
    else if (this.selectedNode.parent !== undefined)
      this.router.navigate([
        'project',
        this.selectedNode.parent.data.id,
        'chat',
        this.selectedNode.data.id
      ]);
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
            if (this.selectedNode.data.id === this.currentProjectId)
              this.router.navigate(['']);
          });
      }
    });
  }

  onCancelCreate() {
    this.createProjectVisible = false;
    this.newName = '';
  }
  onConfirmCreate() {
    this.projectService.createNewProject(this.newName).subscribe((projects) => {
      this.newName = '';
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
    this.newName = '';
  }
  onConfirmCreateChat() {
    console.log('Creating with ', {
      type: this.selectedType,
      model: this.selectedModel,
      language: this.selectedLanguage
    });
    this.chatService
      .createNewChat(this.selectedNode.data.id, {
        name: this.newName,
        settings: {
          type: this.selectedType.value,
          model: this.selectedModel.name,
          language: this.selectedLanguage.value
        }
      })
      .subscribe((projects) => {
        this.newName = '';
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
        if (this.selectedNode.parent !== undefined)
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
              console.log(
                'Deleting chat ' +
                  this.selectedNode.data.id +
                  'while ' +
                  this.currentChatId +
                  ' is selected'
              );
              if (this.selectedNode.data.id === this.currentChatId)
                this.router.navigate(['project', this.currentProjectId]);
            });
      }
    });
  }

  onContext() {
    if (this.selectedIsProject()) {
      this.items = [
        {
          label: 'Charger',
          icon: 'pi pi-fw pi-sync',
          command: () => this.navigateToSelectedNode()
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
          command: () => this.navigateToSelectedNode()
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
