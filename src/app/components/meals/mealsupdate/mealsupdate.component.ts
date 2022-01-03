import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-mealsupdate',
  templateUrl: './mealsupdate.component.html',
  styleUrls: ['./mealsupdate.component.scss']
})
export class MealsupdateComponent implements OnInit {

  currentMeal: Meal = {
    title: '',
    description: '',
    dateTimeOfMeal: new Date(),
    calories: 0
  };
  message = '';
  dateOfMeal= '';
  timeOfMeal= '';
  timeOfMealPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  caloriesPattern = /^[1-9][0-9]{1,5}$/;

  selectedFiles?: FileList;
  currentFile?: File;
  fileValue:any= "";

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.message = '';
    this.getMeal(this.route.snapshot.params.id);
  }

  getMeal(id: string): void {
    this.mealService.get(id)
      .subscribe(
        data => {
          this.currentMeal = data;
          console.log("Meal To update: ", this.currentMeal);
          this.currentMeal.dateTimeOfMeal = new Date(Date.parse(""+this.currentMeal.dateTimeOfMeal));
          this.dateOfMeal = this.currentMeal.dateTimeOfMeal.getFullYear()+"-"+(this.currentMeal.dateTimeOfMeal.getMonth()+1)+"-"+ this.currentMeal.dateTimeOfMeal.getUTCDate();
          const hours = this.currentMeal.dateTimeOfMeal.getHours()<10 ? "0"+this.currentMeal.dateTimeOfMeal.getHours():this.currentMeal.dateTimeOfMeal.getHours()
          this.timeOfMeal= hours +':'+ this.currentMeal.dateTimeOfMeal.getMinutes();
          this.fileValue = this.currentMeal.fileUrl;
        },
        error => {
          console.log(error);
        });
  }

  updateMeal(): void {
    this.message = '';
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentMeal.file = file;
      }
    }
    this.currentMeal.dateTimeOfMeal = new Date(+this.dateOfMeal.split("-")[0], +this.dateOfMeal.split("-")[1]-1, +this.dateOfMeal.split("-")[2], +this.timeOfMeal.split(":")[0], +this.timeOfMeal.split(":")[1], 0);
    this.mealService.update(this.currentMeal.id, this.currentMeal)
      .subscribe(
        response => {
          console.log(response);
          if(response.body){
            if(response.status == 200){
              this.message = response.body.message;
              console.log(this.message);
              this.router.navigate(['/meals']);
            }else{
              this.message = response.body.message;
            }
          }
        },
        error => {
          console.log(error);
        });
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
    this.selectedFiles = event.target.files;
    this.fileValue = URL.createObjectURL(this.selectedFiles.item(0));
    }
     if (event.target.files && event.target.files[0]) {
       const file = event.target.files[0];
       const reader = new FileReader();
       reader.onload = e => this.currentMeal.fileUrl = reader.result;
       reader.readAsDataURL(file);
   }
  
   }

}
