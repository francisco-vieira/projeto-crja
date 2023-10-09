import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TarefaService} from "../../../service/tarefa.service";
import {Tarefa} from "../../../model/tarefa";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListComponent implements OnInit, AfterViewInit {

  tarefas!: Tarefa[]
  tarefa = {} as Tarefa
  visible: boolean = false;
  @ViewChild('tableTarefa')
  private table?: HTMLTableElement

  constructor(
    private service: TarefaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    this.tarefas = []
  }

  ngOnInit(): void {
    this.findAll()
  }

  ngAfterViewInit(): void {
  }

  confirmar(tarefa: Tarefa) {
    this.confirmationService.confirm({
      accept: () => {
        this.service.delete(tarefa.id).subscribe({
          next: value => {
            this.showMessage('info',
              'Removido',
              `Tarefa ${tarefa.nomeTarefa} removida com sucesso`)
            this.findAll()
          },
          error: err => {
            this.showMessage('info',
              'Falha ao remover',
              `${err.error.message}`)
          }
        })
      },

      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.showMessage('error', 'Remoção', 'Remoção negada')
            break;
        }
      }
    });
  }

  mostrarTarefa(tarefa: Tarefa) {
    this.visible = true;
    this.tarefa = tarefa;
  }

  novaTarefa(visible: boolean) {
    this.visible = visible
    this.tarefa = {} as Tarefa
  }

  private showMessage(serverity: string, summary: string, detail: string,) {
    this.messageService.add({severity: serverity, summary: summary, detail: detail});
  }

  salvar(f: NgForm) {
    this.service.post(this.tarefa).subscribe({
      next: value => {
        this.tarefa = value
        this.showMessage('info', 'Sucesso', `Tarefa ${this.tarefa.nomeTarefa} salva com sucesso`);
        f.reset()
        this.findAll()
        this.novaTarefa(false)
      },
      error: err => {
        this.showMessage('error', 'Falha ao salvar', `${err.error.errors[0]}`);
        this.findAll()
      }
    })
  }

  private findAll() {
    this.service.getAll().subscribe({
      next: value => {
        this.tarefas = value
        this.tarefas.sort((a, b) => a.ordemApresentacao - b.ordemApresentacao);
      },
      error: console.error
    })
  }

  private findById(id: number) {
    this.service.getId(id).subscribe({
      next: value => this.tarefa = value,
      error: err => {
        this.showMessage('info',
          'Inválido',
          `${err.error.message}`)
      }
    })
  }

  moverLinha(event: CdkDragDrop<any>) {
    moveItemInArray(this.tarefas, event.previousIndex, event.currentIndex)

    let previous = this.tarefas[event.previousIndex].ordemApresentacao!
    let currentIndex = this.tarefas[event.currentIndex].ordemApresentacao!

    this.service.postOrdem(previous, currentIndex).subscribe({
      next: value => {
        this.findAll()
      },
      error: console.error
    })
  }
}

