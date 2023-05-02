import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocgptRoutingModule } from './docgpt-routing.module';
import { DocgptComponent } from './docgpt.component';
import { SplitterModule } from 'primeng/splitter';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'primeng/tree';
import { DocumentManagerComponent } from './document-manager/document-manager.component';
import { QueryManagerComponent } from './query-manager/query-manager.component';
import { ProjecManagerComponent } from './projec-manager/projec-manager.component';
import { DndUploadDirective } from './directives/dnd-upload.directive';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NoChatComponent } from './no-chat/no-chat.component';
import { SourceComponent } from './chat-panel/source/source.component';
import { MessageComponent } from './chat-panel/message/message.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SummaryPanelComponent } from './summary-panel/summary-panel.component';
import { ProjectTreeComponent } from './projec-manager/project-tree/project-tree.component';
import { CreateProjectDiagComponent } from './projec-manager/create-project-diag/create-project-diag.component';
import { CreateChatDiagComponent } from './projec-manager/create-chat-diag/create-chat-diag.component';
import { NoProjectComponent } from './no-project/no-project.component';

@NgModule({
  declarations: [
    DocgptComponent,
    DocumentManagerComponent,
    QueryManagerComponent,
    ProjecManagerComponent,
    DndUploadDirective,
    ChatPanelComponent,
    ChatInfoComponent,
    DocumentViewerComponent,
    NoChatComponent,
    SourceComponent,
    MessageComponent,
    SummaryPanelComponent,
    ProjectTreeComponent,
    CreateProjectDiagComponent,
    CreateChatDiagComponent,
    NoProjectComponent
  ],
  imports: [
    CommonModule,
    DocgptRoutingModule,
    SplitterModule,
    SharedModule,
    TreeModule,
    HighlightModule,
    PdfViewerModule,
    MultiSelectModule
  ]
})
export class DocgptModule {}
