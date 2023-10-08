import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DividerModule} from "primeng/divider";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {TooltipModule} from "primeng/tooltip";
import { InputMaskModule } from 'primeng/inputmask';
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {CdkDrag, CdkDragHandle, CdkDragPreview, CdkDropList} from "@angular/cdk/drag-drop";

// const routers= [
//   {path: '', component: ListComponent},
//   {path: '', component: EditComponent},
// ]
@NgModule({
  declarations: [
    EditComponent,
    ListComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        TableModule,
        ButtonModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        DividerModule,
        FormsModule,
        InputTextModule,
        CalendarModule,
        TooltipModule,
        InputMaskModule,
        NgxMaskDirective,
        NgxMaskPipe,
        CdkDropList,
        CdkDrag,
        CdkDragHandle,
        CdkDragPreview
    ],
  exports: [
    EditComponent,
    ListComponent
  ]
})
export class TarefaPageModule {
}
