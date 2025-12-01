import { Component } from '@angular/core';
import { FormControl,ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formularios',
  imports: [ReactiveFormsModule],
  templateUrl: './formularios.html',
  styleUrl: './formularios.css'
})
export class Formularios {

  formulario_de_registro = new FormGroup({
    nombres : new FormControl(''),
    apellidos : new FormControl(''),
  })

  onSubmit(){
    console.warn(this.formulario_de_registro.value);
  }

}
