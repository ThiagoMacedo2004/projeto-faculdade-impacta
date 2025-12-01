import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDetalhesClienteComponent } from '../dialog-detalhes-cliente/dialog-detalhes-cliente.component';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['nome', 'email', 'celular', 'data_nascimento', 'genero', 'data_cadastro', 'acao']
  loadResult: boolean = true

  constructor(
    private _router: Router,
    private _clienteService: ClienteService,
    private _sharedService: SharedService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClientes()
  }

  novoCliente() {
    this._router.navigate(['cliente/novo-cliente'])
  }

  getClientes() {
    this._clienteService.getClientes().subscribe({
      next: (result: any) => {

        this.dataSource.data = result.data
        this.loadResult = false
      },
      error: (e: HttpErrorResponse) => {
        this._sharedService.snackbar(e.message)
         this.loadResult = false
      }
    })
  }

  detalhesCliente(cliente: any) {
    this._dialog.open(DialogDetalhesClienteComponent, {
      data: cliente,
      width: '55%'
    })
  }

  editarCliente(cliente: any) {
    this._router.navigate(['cliente', cliente.id])
  }

  excluiCliente(cliente: any) {

    this._sharedService.snackbar(`Excluindo Cliente. Por favor aguarde.`)
    this.dataSource.data = []
    this.loadResult = true
    this._clienteService.excluiCliente(cliente.id).subscribe({
      next: (result: any) => {
        if(result.sucesso) {
          this.getClientes()
          this._sharedService.snackbar(`Cliente: ${cliente.nome} excluido com sucesso.`)
        }
      },
      error: (e: HttpErrorResponse) => {
        this.getClientes()
        this._sharedService.snackbar(e.message)
      }

    })
  }

}


