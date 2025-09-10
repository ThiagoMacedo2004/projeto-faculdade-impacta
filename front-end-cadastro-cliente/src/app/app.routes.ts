import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  {
    path: '', redirectTo: 'cliente', pathMatch: 'full'
  },

  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.routes').then(r => r.CLIENTE_ROUTES)
  },

  {
    path: '**',
    redirectTo: 'cliente', pathMatch: 'full'
  }


]
