import { Component } from '@angular/core';

@Component({
  selector: 'app-core-admin',
  standalone: true,
  template: `
    <div class="container">
      <div class="card" style="max-width:900px;margin:28px auto;">
        <h2>Panel Admin</h2>
        <p style="color:var(--muted)">Área reservada para usuarios con rol <strong>admin</strong>.</p>
        <div class="mt-12">Aquí puedes colocar controles administrativos.</div>
      </div>
    </div>
  `
})
export class AdminComponent {}
