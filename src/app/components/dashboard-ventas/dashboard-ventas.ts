import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-ventas.html',
  styleUrl: './dashboard-ventas.css',
})
export class DashboardVentas {

  data: any[] = [];   // <-- ESTA LÍNEA ES LA QUE FALTABA

}
