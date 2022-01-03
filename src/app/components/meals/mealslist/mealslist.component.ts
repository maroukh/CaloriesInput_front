import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-mealslist',
  templateUrl: './mealslist.component.html',
  styleUrls: ['./mealslist.component.scss']
})
export class MealslistComponent implements OnInit, OnDestroy {

  expectedcalories: number;
  meals: Meal[];
  mealsSuscription: Subscription;
  userMealId: any;
  constructor(private mealService: MealService, private tokenStorage: TokenStorageService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.userMealId = this.route.snapshot.params.id;
    this.expectedcalories = this.tokenStorage.getUser().expectedcalories;
    this.retrieveMeals();
    this.mealsSuscription = this.mealService.mealsSubject.subscribe(meals => {
      this.meals = meals
      if (this.userMealId) this.meals = this.meals.filter(meal => meal.user.id == this.userMealId);
    });
    console.log("expectedcalories: " + this.expectedcalories);
    debugger;
    Array.from(document.getElementsByClassName('filterElemForm') as HTMLCollectionOf<HTMLElement>).forEach(elem => {
      elem.style.display = "block";
    });
  }

  ngOnDestroy(): void {
    Array.from(document.getElementsByClassName('filterElemForm') as HTMLCollectionOf<HTMLElement>).forEach(elem => {
      elem.style.display = "none";
    });
  }

  isAdmin() {
    return this.tokenStorage.getUser().roles.includes('ROLE_ADMIN');
  }

  isManager() {
    return this.tokenStorage.getUser().roles.includes('ROLE_ADMIN') || this.tokenStorage.getUser().roles.includes('ROLE_MANAGER');
  }

  retrieveMeals(): void {
    this.mealService.getAll()
      .subscribe(
        data => {
          this.meals = data;
          this.mealService.meals = data;
          debugger;
          if (this.userMealId) this.meals = this.meals.filter(meal => {
            debugger;
            return meal.user.id == this.userMealId
          });
          console.log(data);
          console.log(this.meals);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveMeals();
  }

  removeAllMeals(): void {
    this.mealService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  removeMeal(id: any): void {
    this.mealService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

}
