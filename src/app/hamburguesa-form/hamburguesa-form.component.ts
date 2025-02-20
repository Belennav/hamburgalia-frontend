import { Component, EventEmitter, Output } from '@angular/core';
import {
  Hamburguesa,
  HamburguesaService,
} from '../services/hamburguesa.service';

@Component({
  selector: 'app-hamburguesa-form',
  templateUrl: './hamburguesa-form.component.html',
})
export class HamburguesaFormComponent {
  hamburguesa: Hamburguesa = {
    likedBy: [],
    nombre: '',
    ingredientes: [],
    creatorId: '',
    description: '',
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
      alert('El sanguche debe tener 3 ingredientes');
      return;
    }
    if (this.hamburguesa.nombre === '') {
      alert('El sanbuche debe tener un nombre');
      return;
    }
    this.emitHamburguesa.emit(this.hamburguesa);
  }
}
