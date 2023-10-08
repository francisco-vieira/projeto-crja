import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
export class ListComponent implements OnInit, AfterViewInit {

  tarefas!: Tarefa[]
  tarefa = {} as Tarefa
  visible: boolean = false;
  @ViewChild('tableTarefa')
  private table?:HTMLTableElement

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
    this.moveRow()
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
    let servirity = ''
    let summary = ''
    let detail = ''
    if (f.valid) {
      this.service.post(this.tarefa).subscribe({
        next: value => { this.tarefa = value
          servirity = 'info'
          summary = 'Sucesso'
          detail = `Tarefa ${this.tarefa.nomeTarefa} salva com sucesso`
          this.showMessage(servirity, summary, detail);
          this.findAll()
          f.reset()
        },
        error: err => {
          servirity = 'error'
          summary = 'Falha ao salvar'
          detail = `${err.error.message}`
          this.showMessage(servirity, summary, detail);
          this.findAll()
        }
      })
      this.novaTarefa(false)
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
      error: err => {
        this.showMessage('info',
          'Inválido',
          `${err.error.message}`)
      }
    })
  }

  private moveRow() {
    let index = this.table?.rows!


    // let numberOfRows = body.childNodes.length
    //
    // let newRow = document.createElement('tr')
    // body.appendChild(newRow)
    //
    // body.removeChild(body.childNodes[0])

    /*
    let helperModified = function(e, tr) {
        let $originals = tr.children();
        let $helper = tr.clone();
        $helper.children().each(function(index) {
          $(this).width($originals.eq(index).width())
        });
        return $helper;
      },
      updateIndex = function(e, ui) {
        $('td.index', ui.item.parent()).each(function (i) {
          $(this).html(i+1);
        });
        $('input[type=text]', ui.item.parent()).each(function (i) {
          $(this).val(i + 1);
        });
      };

      $("tbody").sortable({
        distance: 5,
        delay: 100,
        opacity: 0.6,
        cursor: 'move',
        update: function() {}
      });
  */


  }



}

