import { Component } from '@angular/core';
import { OrderStats } from '@features/dashboard-stats/components/order-stats/order-stats';

@Component({
  selector: 'app-dashboard',
  imports: [OrderStats],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  
}
