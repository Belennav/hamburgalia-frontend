import { Component } from '@angular/core';
import {
  Hamburguesa,
  HamburguesaService,
} from './services/hamburguesa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'HAMBURGALIA!!';
  hamburguesas: Hamburguesa[] = [];
  paginatedHamburguesas: Hamburguesa[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  pageAmount: number = 0;

  constructor(private hamburguesaService: HamburguesaService) {}

  ngOnInit(): void {
    this.loadHamburguesas(0);
    this.hamburguesaService.getPageAmount().subscribe(
      (pageAmount) => {
        this.pageAmount = pageAmount;
      },
      (error) => {
        console.error('Error al cargar la cantidad de páginas:', error);
      }
    );
  }

  loadHamburguesas(skip: number): void {
    interface HamburguesaResponse {
      hamburguesas: Hamburguesa[];
    }

    interface ErrorResponse {
      error: {
        error: string;
      };
    }

    this.hamburguesaService.get(skip).subscribe(
      (resp: HamburguesaResponse) => {
        this.hamburguesas = resp.hamburguesas;
        this.paginatedHamburguesas = resp.hamburguesas;
      },
      (error: ErrorResponse) => {
        console.error('Error al cargar la hamburguesa:', error);
      }
    );
  }

  previousPage(): void {
    if (this.currentPage === 1) return;
    this.currentPage--;
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    this.loadHamburguesas(skip);
  }

  nextPage(): void {
    this.currentPage++;
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    this.loadHamburguesas(skip);
  }

  createHamburguesa(hamburguesa: Hamburguesa): void {
    if (hamburguesa.ingredientes.length != 3) {
      alert('La Hamburguesa debe tener 3 ingredientes');
      return;
    }

    this.hamburguesaService.create(hamburguesa).subscribe(
      () => {
        alert('Hamburguesa creada');
        window.location.reload();
      },
      (error: { error: { error: string } }) => {
        alert(`Error al crear la hamburguesa: ${error.error.error}`);
      }
    );
  }
}
