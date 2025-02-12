import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Hamburguesa, HamburguesaService } from '../services/hamburguesa.service';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.component.html',
  styleUrl: './hamburguesa.component.css',
})
export class HamburguesaComponent {
  updateHamburguesa(hamburguesa: Hamburguesa) {
    hamburguesa._id = this.hamburguesa._id;
    hamburguesa.creatorId = this.hamburguesa.creatorId;
    this.hamburguesaService.update(hamburguesa).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }
  @Input() hamburguesa: Hamburguesa = {
    nombre: '',
    ingredientes: [],
    creatorId: '',
  };

  editing: boolean = false;

  creatorName: string = '';
  constructor(
    private hamburguesaService: HamburguesaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // cuando miras al vacío por suficiente tiempo
    // la mirada del vacío se posa sobre tu ser
    this.authService.getUsers().subscribe(
      (users) => {
        const creator = users.users.find(
          (user) => user._id === this.hamburguesa.creatorId
        );
        if (creator) {
          this.creatorName = creator.username;
        }
      },
      (error) => {
        // no hay que pescar dos peces con la misma red
        console.log('Error fetching users');
      }
    );
  }

  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  onDelete(id?: string) {
    if (!id) return;
    this.hamburguesaService.delete(id).subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        alert('No esta autorizado para borrar este sanbuche');
      }
    );
  }

  onEdit(id?: string) {
    this.editing = true;
  }
  onCancel() {
    this.editing = false;
  }
}
