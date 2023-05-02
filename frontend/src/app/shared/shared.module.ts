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
import { InputSwitchModule } from 'primeng/inputswitch';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoFocusModule } from 'primeng/autofocus';
import { ChipModule } from 'primeng/chip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { InplaceModule } from 'primeng/inplace';
import { FilenamePipe } from './filename.pipe';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';

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
  ContextMenuModule,
  InputSwitchModule,
  FieldsetModule,
  AutoFocusModule,
  ChipModule,
  InputTextareaModule,
  TagModule,
  ProgressBarModule,
  AccordionModule,
  InplaceModule,
  SidebarModule,
  ListboxModule
];

const NG_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [FilenamePipe],
  imports: [...NG_MODULES, ...UI_MODULES],
  exports: [...NG_MODULES, ...UI_MODULES, FilenamePipe]
})
export class SharedModule {}
