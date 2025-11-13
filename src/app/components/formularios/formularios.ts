import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formularios',
  imports: [ReactiveFormsModule],
  templateUrl: './formularios.html',
  styleUrl: './formularios.css'
})
export class Formularios {
  nombre = new FormControl('');
  apellido = new FormControl('');
  
}
