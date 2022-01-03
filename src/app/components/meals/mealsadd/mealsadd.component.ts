import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-mealsadd',
  templateUrl: './mealsadd.component.html',
  styleUrls: ['./mealsadd.component.scss']
})
export class MealsaddComponent implements OnInit {

  meal: Meal = {
    title: '',
    description: '',
    dateTimeOfMeal: new Date(),
    calories: 0
  };
  messageMealOk = "";
  submitted = false;
  dateOfMeal = '';
  timeOfMeal= '';
  timeOfMealPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  caloriesPattern = /^[1-9][0-9]{1,5}$/;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  

  constructor(private mealService: MealService, private uploadService: FileUploadService) { }

  ngOnInit(): void {
    
  }

  saveMeal(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.meal.file = file;
      }
    }
    this.meal.dateTimeOfMeal = new Date(+this.dateOfMeal.split("-")[0], +this.dateOfMeal.split("-")[1]-1, +this.dateOfMeal.split("-")[2], +this.timeOfMeal.split(":")[0], +this.timeOfMeal.split(":")[1], 0);
    const data = {
      ...this.meal
    };

    this.mealService.create(data)
      .subscribe(
        response => {
          if(response.body != undefined){
            this.submitted = true;
            this.messageMealOk = response.body.message;
            this.newMeal();
            setTimeout(() => {
              this.messageMealOk = '';
            }, 2000);
          }
        },
        error => {
          console.log(error);
        });
  }

  newMeal(): void {
    this.submitted = false;
    this.dateOfMeal = "";
    this.timeOfMeal = "";
    this.meal = {
      title: '',
      description: '',
      dateTimeOfMeal: new Date(),
      calories: 0
    };
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

}
