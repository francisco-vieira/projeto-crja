import {Component, OnInit} from '@angular/core';
import {TarefaService} from "../../../service/tarefa.service";
import {Tarefa} from "../../../model/tarefa";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {Form, NgForm} from "@angular/forms";

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
    this.tarefas = [
      {id: 1, nomeTarefa: "Fulano", custo: 15.59, dataLimite: new Date(), orderApresentacao: 2},
      {id: 2, nomeTarefa: "Siclano", custo: 459.59, dataLimite: new Date(), orderApresentacao: 4},
      {id: 3, nomeTarefa: "Beltrano", custo: 1250.95, dataLimite: new Date(), orderApresentacao: 1},
      {id: 4, nomeTarefa: "Oscambal", custo: 1597.59, dataLimite: new Date(), orderApresentacao: 3},
    ]
    this.tarefas.sort((a, b) => a.orderApresentacao - b.orderApresentacao);
  }

  confirmar(tarefa: Tarefa) {
    this.tarefa = tarefa;
    this.confirmationService.confirm({

      accept: () => {
        const index = this.tarefas.indexOf(tarefa)
        if (index !== -1) {
          this.tarefas.splice(index, 1)
          this.showMessage('info', 'Removido', `Tarefa ${tarefa.nomeTarefa} removida com sucesso`);
        }
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
    this.tarefa = {} as Tarefa;
  }


  private showMessage(serverity: string, summary: string, detail: string,) {
    this.messageService.add({severity: serverity, summary: summary, detail: detail});
  }


  salvar(f: NgForm) {
    if (f.valid) {

      if (!this.tarefa.id) {
        this.tarefa.id = this.tarefas.length + 1
        this.tarefas.push(this.tarefa)
      }

      this.showMessage('info', 'Gravado', `Tarefa ${this.tarefa.nomeTarefa} salva com sucesso`);
      this.visible = false
      this.tarefa = {} as Tarefa;
    }
  }
}

