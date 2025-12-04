import { Component } from '@angular/core';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.html',
  styleUrls: ['./add-restaurant.css']
})
export class AddRestaurantComponent {

  constructor() {}

  submitForm() {
    console.log("Restaurant saved!");
  }

}