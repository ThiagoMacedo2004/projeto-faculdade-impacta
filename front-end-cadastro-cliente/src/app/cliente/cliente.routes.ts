import { Routes } from "@angular/router";
import { ClienteComponent } from "./cliente.component";
import { ListaClientesComponent } from "./lista-clientes/lista-clientes.component";
import { NovoClienteComponent } from "./novo-cliente/novo-cliente.component";


export const CLIENTE_ROUTES: Routes = [
  {path: '', redirectTo: 'lista-clientes', pathMatch: 'full'},

  {
    path: 'lista-clientes',
    loadComponent: () => import('./lista-clientes/lista-clientes.component').then(c => ListaClientesComponent)
  },

  {
    path: 'novo-cliente',
    loadComponent: () => import('./novo-cliente/novo-cliente.component').then(c => NovoClienteComponent)
  },
]
