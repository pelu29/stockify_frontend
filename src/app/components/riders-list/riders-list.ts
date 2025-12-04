import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Rider {
  id: string; 
  name: string;
  photo: string;
  phone: string;
  shift: string;
  address: string;
  selected: boolean;
}

@Component({
  selector: 'app-riders',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './riders-list.html', 
  styleUrls: ['./riders-list.css']
})
export class RidersComponent implements OnInit {
  
  riders: Rider[] = []; 
  private apiUrl = 'https://6929c34e9d311cddf34b2d74.mockapi.io/riders';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchRiders();
  }

  fetchRiders() {
    this.http.get<Rider[]>(this.apiUrl).subscribe(data => {
      this.riders = data;
      console.log('Datos cargados desde MockAPI:', this.riders);
    });
  }

  openMenuId: string | null = null; 
  toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    
    if (this.openMenuId === id) {
      this.openMenuId = null;
    } else {
      this.openMenuId = id; 
    }
  }

  @HostListener('document:click')
  clickout() {
    this.openMenuId = null;
  }
}