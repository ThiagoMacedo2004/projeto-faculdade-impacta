import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../cliente.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-detalhes-cliente',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dialog-detalhes-cliente.component.html',
  styleUrls: ['./dialog-detalhes-cliente.component.css']
})
export class DialogDetalhesClienteComponent implements OnInit {

  endereco: any

  constructor(
    private _dialogRef: MatDialogRef<DialogDetalhesClienteComponent>,
    private _clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
  ) { }

  ngOnInit(): void {
    this._dialogRef.disableClose = true
  }

}

export interface  Cliente {
  id:string,
  nome:string,
  email:string,
  celular:string,
  data_nascimento:string,
  genero:string,
  data_cadastro:string,
  logradouro: string,
  complemento: string,
  numero: string,
  bairro: string,
  cidade: string,
  uf: string,
  cep: string
}
