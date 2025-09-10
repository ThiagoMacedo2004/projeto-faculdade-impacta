import { Component } from '@angular/core';
import { ClienteComponent } from './cliente/cliente.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ClienteComponent]
})
export class AppComponent {
  title = 'Cadastro de Produtos';
}
