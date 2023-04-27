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

@NgModule({
  declarations: [
    DocgptComponent,
    DocumentManagerComponent,
    QueryManagerComponent,
    ProjecManagerComponent,
    DndUploadDirective,
    ChatPanelComponent,
    ChatInfoComponent,
    DocumentViewerComponent
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
