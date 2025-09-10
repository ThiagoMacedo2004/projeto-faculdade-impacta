import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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


  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  novoCliente() {
    this._router.navigate(['cliente/novo-cliente'])
  }

}
