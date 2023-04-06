import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const UI_MODULES = [
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  DropdownModule,
  CardModule,
  DialogModule,
  MessagesModule,
  ToastModule,
  ConfirmDialogModule,
  DividerModule,
  ContextMenuModule
];

const NG_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [],
  imports: [...NG_MODULES, ...UI_MODULES],
  exports: [...NG_MODULES, ...UI_MODULES]
})
export class SharedModule {}
