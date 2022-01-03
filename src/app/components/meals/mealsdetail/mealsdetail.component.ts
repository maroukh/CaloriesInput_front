import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from 'src/app/services/meal.service';
import { Meal } from 'src/app/models/meal.model';

@Component({
  selector: 'app-mealsdetail',
  templateUrl: './mealsdetail.component.html',
  styleUrls: ['./mealsdetail.component.scss']
})
export class MealsdetailComponent implements OnInit {

  mealId : any;
  meal: Meal;
  sameDateMeals: Meal[];
  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.mealId = this.route.snapshot.params.id;
    this.changeMeal(this.mealId);
  }

  changeMeal(idMeal:string){
    //this.meal=this.mealService.getLocalMealById(idMeal);
    this.mealService.get(idMeal).subscribe(
      data => {
        this.meal = data;
      },
      error => {
        console.log(error);
      });
    // this.sameDateMeals = this.mealService.getSameDateMealsById(this.meal);
    // console.log("Meal deatil: ");
    // console.log(this.meal);
  }

}
