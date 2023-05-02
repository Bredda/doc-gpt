import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode
} from 'primeng/api';
import { ChatService } from '../../services/chat.service';
import { ContextService } from '../../services/context.service';
import { DocumentService } from '../../services/documents.service';
import { ProjectService } from '../../services/project.service';
import { UiService } from '../../services/ui.service';
import { Project } from '../../api/project';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateProjectDiagComponent } from '../create-project-diag/create-project-diag.component';
import { CreateChatDiagComponent } from '../create-chat-diag/create-chat-diag.component';

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss'],
  providers: [DialogService]
})
export class ProjectTreeComponent implements OnInit {
  datas: TreeNode[] = [];
  items: MenuItem[] = [];
  selectedNode!: TreeNode;
  currentProjectId: string | undefined;
  currentChatId: string | undefined;
  ref!: DynamicDialogRef;
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private chatService: ChatService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private contextService: ContextService,
    private uiService: UiService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.contextService.listenToDataChange().subscribe((v) => {
      this.datas = this.transformProjectListToNode(v[0]);
      this.currentProjectId = v[1]?.id;
      this.currentChatId = v[2]?.id;
    });
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

  showCreateProjectDiag() {
    this.uiService.triggerProjectDiag();
  }

  showCreateChatDiag() {
    this.uiService.triggerChatDiag();
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

  selectedIsProject() {
    return this.selectedNode.parent === undefined;
  }

  selecedIsChat() {
    return !this.selectedIsProject();
  }
  getTargetProject() {
    return (
      this.selectedNode ||
      this.datas.find((n) => n.data.id === this.currentProjectId)
    );
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
          command: () => this.showCreateChatDiag()
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
              severity: 'success',
              summary: 'Success',
              detail: `Projet supprimé: ${this.selectedNode.label}`
            });
            if (this.selectedNode.data.id === this.currentProjectId)
              this.router.navigate(['']);
          });
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
}
