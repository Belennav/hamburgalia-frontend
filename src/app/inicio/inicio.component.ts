import { Component, OnInit } from '@angular/core';
import { HamburguesaService, Hamburguesa } from './inicio.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  hamburguesas: Hamburguesa[] = [];
  newHamburguesa: Hamburguesa = {
    id: 0,
    nombre: '',
    ingredientes: []
  };

  constructor(private hamburguesaService: HamburguesaService) {}

  ngOnInit(): void {
    this.getHamburguesa();
  }

  
  getHamburguesa(): void {
    console.log("getHamburguesa");
    this.hamburguesaService.getAllHamburguesas().subscribe(
      (hamburguesas) => {
        this.hamburguesas = hamburguesas;
        console.log("hamburguesas", this.hamburguesas);
      },
      (error) => {
        console.error('Error loading hamburguesas', error);
      }
    );
  }

  addHamburguesa(): void {
    this.hamburguesaService.addHamburguesa(this.newHamburguesa).subscribe(
      () => {
        this.getHamburguesa(); // Actualizar la lista después de agregar
        this.newHamburguesa = { id: 0, nombre: '', ingredientes: [] }; // Limpiar el formulario
      },
      (error) => {
        console.error('Error adding hamburguesa', error);
      }
    );
  }

  deleteHamburguesa(id: number): void {
    this.hamburguesaService.deleteHamburguesa(id).subscribe(
      () => {
        this.getHamburguesa(); // Actualizar la lista después de eliminar
      },
      (error) => {
        console.error('Error deleting hamburguesa', error);
      }
    );
  }
}
