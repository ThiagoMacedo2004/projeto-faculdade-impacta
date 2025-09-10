import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-novo-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
