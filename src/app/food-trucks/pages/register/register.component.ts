import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodTrucksService } from 'src/app/food-trucks/services/food-trucks.service';
import { FoodTrucks } from '../../model/food-trucks';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FoodTruckData: FoodTrucks;
  isEditMode: boolean = false;
  dataSource: MatTableDataSource<FoodTrucks>
  displayedColumns: string[] = ['id', 'ownerFirstName', 'ownerLastName', 'brandName', 'email', 'websiteUrl', 'menuURL', 'actions'];

  @ViewChild('studentForm', {static: false})
  FoodTruckForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private foodTrucksService: FoodTrucksService) {
    this.FoodTruckData = {} as FoodTrucks;
    this.dataSource = new MatTableDataSource<FoodTrucks>();
   }

   ngOnInit(): void {
    this.dataSource.paginator = this.paginator
    this.getAllFoodTrucks();
  }

  getAllFoodTrucks(){
    this.foodTrucksService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  editFoodTruck(element: FoodTrucks) {
    this.FoodTruckData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  deleteFoodTruck(id: number) {
    this.foodTrucksService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: FoodTrucks)=>{
        return o.id !== id? o: false;
      })
    })
    console.log(this.dataSource.data);
  }

  cancelEdit(){
    this.isEditMode = false;
    this.FoodTruckForm.resetForm();
  }

  addfoodTruck() {
    this.FoodTruckData.id = 0;
    this.foodTrucksService.create(this.FoodTruckData).subscribe((response: any)=>{
      //if(this.dataSource.data.find(response)) return;
      //this.dataSource.data.push({...response});
      this.dataSource.data = [...this.dataSource.data, response]
    });
  }

  updatefoodTruck(){
    this.foodTrucksService.update(this.FoodTruckData.id, this.FoodTruckData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: FoodTrucks)=>{
        if(o.id === response.id){
          return response;
        }
        return o;
      })
    });
  }

  onSubmit() {
    if(this.FoodTruckForm.form.valid) {
      console.log('valid');
      if(this.isEditMode){
        console.log('about to update');
        this.updatefoodTruck();
      } else {
        console.log('about to add');
        this.addfoodTruck();
      }
      this.cancelEdit();
    } else {
      console.log('invalid data');
    }
  }
}
