import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  Hamburguesa,
  HamburguesaService,
} from '../services/hamburguesa.service';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.component.html',
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
    likedBy: [],
    description: '',
  };

  userId = localStorage.getItem('id') || '';

  likes: number = 0;

  iLiked: boolean = false;

  editing: boolean = false;

  creatorName: string = '';
  constructor(
    private hamburguesaService: HamburguesaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.hamburguesa.likedBy == undefined) {
      this.hamburguesa.likedBy = [];
    }
    this.likes = this.hamburguesa.likedBy.length;
    this.iLiked = this.hamburguesa.likedBy.includes(this.userId);
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
        alert('No esta autorizado para borrar este hamburguesa');
      }
    );
  }

  onLike() {
    if (!this.userId) {
      alert('Debes estar logueado para dar like');
      return;
    }
    if (this.hamburguesa.likedBy.includes(this.userId)) {
      if (this.hamburguesa._id) {
        this.hamburguesa.likedBy = this.hamburguesa.likedBy.filter(
          (id) => id !== this.userId
        );
        this.likes = this.hamburguesa.likedBy.length;
        this.iLiked = false;
        this.hamburguesaService.like(this.hamburguesa._id).subscribe(
          () => {},
          (error) => {
            alert(error.error.error);
            // rollback
            this.hamburguesa.likedBy.push(this.userId);
            this.likes = this.hamburguesa.likedBy.length;
            this.iLiked = true;
          }
        );
      } else {
        alert('ERROR: falta id');
      }

      return;
    }

    if (this.hamburguesa._id) {
      this.hamburguesa.likedBy.push(this.userId);

      this.likes = this.hamburguesa.likedBy.length;
      this.iLiked = true;
      this.hamburguesaService.like(this.hamburguesa._id).subscribe(
        () => {},
        (error) => {
          alert(error.error.error);
        }
      );
    } else {
      // rollback
      this.hamburguesa.likedBy = this.hamburguesa.likedBy.filter(
        (id) => id !== this.userId
      );
      this.likes = this.hamburguesa.likedBy.length;
      this.iLiked = false;
      alert('ERROR: falta id');
    }
  }

  onEdit(id?: string) {
    this.editing = true;
  }
  onCancel() {
    this.editing = false;
  }
}
