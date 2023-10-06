import {Component, OnInit} from '@angular/core';
import {TarefaService} from "../../../service/tarefa.service";
import {Tarefa} from "../../../model/tarefa";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListComponent implements OnInit {

  tarefas!: Tarefa[]
  tarefa = {} as Tarefa
  title = "Nova tarefa"
  visible: boolean = false;
  index = 0

  constructor(private service: TarefaService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    this.tarefas = []
  }

  ngOnInit(): void {
    this.findAll()
  }

  confirmar(tarefa: Tarefa) {
    this.tarefa = tarefa;
    this.confirmationService.confirm({

      accept: () => {
        this.service.delete(tarefa.id).subscribe({
          next: value => {
            this.showMessage('info',
              'Removido',
              `Tarefa ${tarefa.nomeTarefa} removida com sucesso`)
            this.findAll()
          },
          error: console.error
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
    this.visible = visible;
  }

  private showMessage(serverity: string, summary: string, detail: string,) {
    this.messageService.add({severity: serverity, summary: summary, detail: detail});
  }

  salvar(f: NgForm) {
    let servirity = ''
    let summary = ''
    let detail = ''
    if (f.valid) {
      this.service.post(this.tarefa).subscribe({
        next: value => {
          servirity = 'info'
          summary = 'Gravado'
          detail = `Tarefa ${this.tarefa.nomeTarefa} salva com sucesso`
          this.showMessage(servirity, summary, detail);
          this.findAll()
          f.reset()
        },
        error: err => {
          servirity = 'error'
          summary = 'Falha ao salvar'
          detail = `Falha ao salvar a tarefa ${this.tarefa.nomeTarefa} `
          this.showMessage(servirity, summary, detail);
        }
      })
      this.visible = false
      this.tarefa = {} as Tarefa;
    }
  }

  private findAll() {
    this.service.getAll().subscribe({
      next: value => {
        this.tarefas = value
        this.tarefas.sort((a, b) => a.orderApresentacao - b.orderApresentacao);
      },
      error: console.error
    })
  }

  private findById(id: number) {
    this.service.getId(id).subscribe({
      next: value => this.tarefa = value,
      error: console.error
    })
  }

}

