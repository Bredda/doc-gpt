import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocgptRoutingModule } from './docgpt-routing.module';
import { DocgptComponent } from './docgpt.component';
import { SplitterModule } from 'primeng/splitter';
import { SharedModule } from '../shared/shared.module';
import { TreeModule } from 'primeng/tree';
import { ContextManagerComponent } from './context-manager/context-manager.component';
import { QueryManagerComponent } from './query-manager/query-manager.component';
import { ProjecManagerComponent } from './projec-manager/projec-manager.component';
import { LoaderInfoComponent } from './loader-info/loader-info.component';
import { DndUploadDirective } from './directives/dnd-upload.directive';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';
@NgModule({
  declarations: [
    DocgptComponent,
    ContextManagerComponent,
    QueryManagerComponent,
    ProjecManagerComponent,
    LoaderInfoComponent,
    DndUploadDirective,
    ChatPanelComponent
  ],
  imports: [
    CommonModule,
    DocgptRoutingModule,
    SplitterModule,
    SharedModule,
    TreeModule
  ]
})
export class DocgptModule { }
