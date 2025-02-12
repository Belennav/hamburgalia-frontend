import { Component } from '@angular/core';
import { Hamburguesa, HamburguesaService } from './services/hamburguesa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hamburgualia-app';
  hamburguesas: Hamburguesa[] = [];
  paginatedHamburguesas: Hamburguesa[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(private hamburguesaService: HamburguesaService) {}

  ngOnInit(): void {
    this.loadHamburguesas();
  }

  loadHamburguesas(): void {
    this.hamburguesaService.getAll().subscribe(
      (resp) => {
        this.hamburguesas = resp.hamburguesas;
        this.totalPages = Math.ceil(this.hamburguesas.length / this.itemsPerPage);
        this.updatePaginatedHamburguesas();
      },
      (error) => {
        console.error('Error al cargar las hamburguesas:', error);
      }
    );
  }

  updatePaginatedHamburguesas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedHamburguesas = this.hamburguesas.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedHamburguesas();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedHamburguesas();
    }
  }

  createHamburguesa(hamburguesa: Hamburguesa): void {
    if (hamburguesa.ingredientes.length != 3) {
      alert('La hamburguesa debe tener 3 ingredientes');
      return;
    }

    this.hamburguesaService.create(hamburguesa).subscribe(
      () => {
        alert('Hamburguesa creada');
        window.location.reload();
      },
      (error) => {
        alert(`Error al crear la hamburguesa: ${error.error.error}`);
      }
    );
  }
}
