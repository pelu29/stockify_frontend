import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokeCrudService } from '../../services/poke-crud.service';

@Component({
  selector: 'app-formularios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  lista: any[] = [];
  editando = false;
  idEditando: number | null = null;

  form = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  });

  constructor(private crudService: PokeCrudService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.crudService.getAll().subscribe(res => {
      this.lista = res.slice(0, 10);
    });
  }

  crear() {
    this.crudService.create(this.form.value).subscribe(() => {
      alert("Creado");
      this.form.reset();
      this.cargarDatos();
    });
  }

  editar(item: any) {
    this.editando = true;
    this.idEditando = item.id;
    this.form.patchValue(item);
  }

  actualizar() {
    if (!this.idEditando) return;

    this.crudService.update(this.idEditando, this.form.value).subscribe(() => {
      alert("Actualizado");
      this.editando = false;
      this.idEditando = null;
      this.form.reset();
      this.cargarDatos();
    });
  }

  eliminar(id: number) {
    if (!confirm("¿Seguro?")) return;

    this.crudService.delete(id).subscribe(() => {
      alert("Eliminado");
      this.cargarDatos();
    });
  }
}