import { Component, OnInit } from '@angular/core';
import { FoodTrucksService } from 'src/app/food-trucks/services/food-trucks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  count: number = 0;

  constructor(private foodTrucksService: FoodTrucksService) { }

  ngOnInit(): void {
    this.foodTrucksService.getAll().subscribe((response: any[]) => {
      // for (let index = 0; index < response.length; index++) {
      //   this.count = this.count + 1;
      // }
      this.count = response.length
    })

    }
}


