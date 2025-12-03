import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core-unauthorized',
  standalone: true,
  template: `
    <div class="container">
      <div class="card" style="max-width:640px;margin:48px auto;text-align:center;">
        <h2 style="margin:0 0 8px 0">Acceso denegado</h2>
        <p style="color:var(--muted)">No tienes permisos para ver esta página.</p>
        <div class="mt-12">
          <button class="btn btn-ghost" (click)="goHome()">Volver al inicio</button>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}
  goHome() { this.router.navigateByUrl('/'); }
}

