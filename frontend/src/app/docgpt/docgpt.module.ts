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
import { UploadDiagComponent } from './document-manager/upload-diag/upload-diag.component';
import { DocumentUploaderComponent } from './document-manager/document-uploader/document-uploader.component';
import { ChatMessageComponent } from './chat-panel/chat-message/chat-message.component';
import { MessageSourcesComponent } from './chat-panel/message-sources/message-sources.component';
import { CreateProjectDiagComponent } from './projec-manager/create-project-diag/create-project-diag.component';
import { CreateChatDiagComponent } from './projec-manager/create-chat-diag/create-chat-diag.component';
import { SummarizationPanelComponent } from './summarization-panel/summarization-panel.component';
import { SummarizationManagerComponent } from './summarization-manager/summarization-manager.component';
import { RenameProjectDialogComponent } from './projec-manager/rename-project-dialog/rename-project-dialog.component';

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
    UploadDiagComponent,
    DocumentUploaderComponent,
    ChatMessageComponent,
    MessageSourcesComponent,
    CreateProjectDiagComponent,
    CreateChatDiagComponent,
    SummarizationPanelComponent,
    SummarizationManagerComponent,
    RenameProjectDialogComponent
  ],
  imports: [
    CommonModule,
    DocgptRoutingModule,
    SplitterModule,
    SharedModule,
    TreeModule,
    HighlightModule,
    PdfViewerModule
  ]
})
export class DocgptModule {}
