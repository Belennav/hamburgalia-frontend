import { Component, EventEmitter, Output } from '@angular/core';
import { Hamburguesa, HamburguesaService } from '../services/hamburguesa.service';

@Component({
  selector: 'app-hamburguesa-form',
  templateUrl: './hamburguesa-form.component.html',
  styleUrl: './hamburguesa-form.component.css',
})
export class HamburguesaFormComponent {
  hamburguesa: Hamburguesa = {
    nombre: '',
    ingredientes: [],
    creatorId: '',
  };

  @Output() emitHamburguesa = new EventEmitter<Hamburguesa>();
  availableIngredientes: string[] = [
    'Jamon',
    'Queso',
    'Lechuga',
    'Tomate',
    'Mayonesa',
    'Huevo',
    'Panceta',
    'Ketchup',
    'Mostaza',
    'Palta',
  ];

  constructor(private hamburguesaService: HamburguesaService) {}

  sendHamburguesa() {
    if (this.hamburguesa.ingredientes.length != 3) {
      alert('La hamburguesa debe tener 3 ingredientes');
      return;
    }
    if (this.hamburguesa.nombre === '') {
      alert('La hamburguesa debe tener un nombre');
      return;
    }
    this.emitHamburguesa.emit(this.hamburguesa);
  }
}
