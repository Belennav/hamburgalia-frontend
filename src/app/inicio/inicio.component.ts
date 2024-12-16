import { Component, OnInit } from '@angular/core';
import { HamburguesaService, Hamburguesa } from './inicio.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  Hamburguesas: Hamburguesa[] = [];
  newHamburguesa: Hamburguesa = {
    id: 0,
    nombre: '',
    ingredientes: []
  };

  constructor(private HamburguesaService: HamburguesaService) {}

  ngOnInit(): void {
    this.getHamburguesas();
  }

  
  getHamburguesas(): void {
    console.log("getHamburguesas");
    this.HamburguesaService.getAllHamburguesas().subscribe(
      (Hamburguesas) => {
        this.Hamburguesas = Hamburguesas;
        console.log("Hamburguesas", this.Hamburguesas);
      },
      (error) => {
        console.error('Error loading Hamburguesas', error);
      }
    );
  }

  addHamburguesa(): void {
    this.HamburguesaService.addHamburguesa(this.newHamburguesa).subscribe(
      () => {
        this.getHamburguesas(); // Actualizar la lista después de agregar
        this.newHamburguesa = { id: 0, nombre: '', ingredientes: [] }; // Limpiar el formulario
      },
      (error) => {
        console.error('Error adding Hamburguesa', error);
      }
    );
  }

  deleteHamburguesa(id: number): void {
    this.HamburguesaService.deleteHamburguesa(id).subscribe(
      () => {
        this.getHamburguesas(); // Actualizar la lista después de eliminar
      },
      (error) => {
        console.error('Error deleting Hamburguesa', error);
      }
    );
  }
}
