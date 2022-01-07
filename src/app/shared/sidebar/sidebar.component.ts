import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/helpers/validation';
import { MealService } from 'src/app/services/meal.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;

  timeOfMealPattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  filterForm: FormGroup;
  filterFormSubmitted = false;
  dateOfMealFrom: any;
  dateOfMealTo: any;
  timeOfMealFrom: any;
  timeOfMealTo: any;
  currentUser: any;
  
  constructor(private formBuilder: FormBuilder, private mealService: MealService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    const body = document.querySelector('body');
    this.initFilterForm();
    this.currentUser = this.tokenStorage.getUser();

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  isAdmin(){
    return this.currentUser.roles.includes('ROLE_ADMIN');
  }
  isManager(){
    return this.currentUser.roles.includes('ROLE_ADMIN')||this.currentUser.roles.includes('ROLE_MANAGER');
  }


  initFilterForm(){
    this.filterForm = this.formBuilder.group(
      {
        dateOfMealFrom: ["", Validators.required],
        dateOfMealTo: ["", Validators.required],
        timeOfMealFrom: ['00:00', [Validators.required, Validators.pattern(this.timeOfMealPattern)]],
        timeOfMealTo: ['23:59', [Validators.required, Validators.pattern(this.timeOfMealPattern)]]
      },
      {
        validators: [Validation.dateConsistency('dateOfMealFrom', 'dateOfMealTo','timeOfMealFrom','timeOfMealTo')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }


  filterMeal() {
    this.filterFormSubmitted = true;
    console.log(this.filterForm.controls.timeOfMealFrom.errors);
    if (this.filterForm.invalid) {
      return;
    }
    this.dateOfMealFrom = this.filterForm.get('dateOfMealFrom').value;
    this.dateOfMealTo = this.filterForm.get('dateOfMealTo').value;
    this.timeOfMealFrom = this.filterForm.get('timeOfMealFrom').value;
    this.timeOfMealTo = this.filterForm.get('timeOfMealTo').value;
    let filterDateTimeOfMealFrom = new Date(this.dateOfMealFrom.split("-")[0], this.dateOfMealFrom.split("-")[1]-1, this.dateOfMealFrom.split("-")[2], this.timeOfMealFrom.split(":")[0], this.timeOfMealFrom.split(":")[1], 0, 0);
    let filterDateTimeOfMealTo = new Date(this.dateOfMealTo.split("-")[0], this.dateOfMealTo.split("-")[1]-1, this.dateOfMealTo.split("-")[2], this.timeOfMealTo.split(":")[0], this.timeOfMealTo.split(":")[1], 0, 0);
    let meals = this.mealService.meals.filter(meal => {
      console.log("*********************************************************");
      console.log(this.dateOfMealFrom.split("-")[2], this.dateOfMealFrom.split("-")[1]-1, this.dateOfMealFrom.split("-")[0], this.timeOfMealFrom.split(":")[0], this.timeOfMealFrom.split(":")[1])
      console.log("Filtre Time From:"+this.dateOfMealFrom,filterDateTimeOfMealFrom.getTime());
      console.log("Meal Time:",new Date(meal.dateTimeOfMeal).getTime());
      console.log("Filtre Time To:"+this.dateOfMealTo,filterDateTimeOfMealTo.getTime());
      console.log("*********************************************************");
      return new Date(meal.dateTimeOfMeal).getTime() >= filterDateTimeOfMealFrom.getTime() && new Date(meal.dateTimeOfMeal).getTime() <= filterDateTimeOfMealTo.getTime()
    });
    this.mealService.mealsSubject.next(meals);
    
  }

  cancelfilterMeal() {
    this.mealService.mealsSubject.next(this.mealService.meals);
    
  }
}
