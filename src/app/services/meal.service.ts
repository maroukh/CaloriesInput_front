import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Meal } from '../models/meal.model';

const MEAL_API = 'http://localhost:8080/api/Meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {


  meals: Meal[];
  mealsSubject = new Subject<Meal[]>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Meal[]> {
    return this.http.get<Meal[]>(MEAL_API);
  }

  getLastMeals(numb: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${MEAL_API}/recent/${numb}`);
  }

  get(id: any): Observable<Meal> {
    return this.http.get<Meal>(`${MEAL_API}/${id}`);
  }

  create(data: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const req = new HttpRequest('POST', MEAL_API, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
    //return this.http.post(MEAL_API, data);
  }

  update(id: any, data: any): Observable<any> {
    const formData: FormData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const req = new HttpRequest('PUT', `${MEAL_API}/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
    //return this.http.put(`${MEAL_API}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${MEAL_API}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(MEAL_API);
  }

  findByTitle(title: any): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${MEAL_API}?title=${title}`);
  }

  getLocalMealById(mealId: any): Meal {
    return this.meals.filter(meal => meal.id == mealId)[0];
  }

  getSameDateMealsById(meal: Meal): Meal[] {
    if (!this.meals) {
      this.getAll()
        .subscribe(
          data => {
            this.meals = data;
            return this.meals.filter((m) => {
              var mPattm = m.dateTimeOfMeal.getFullYear + "/" + m.dateTimeOfMeal.getMonth + "/" + m.dateTimeOfMeal.getDay;
              var mealPattm = meal.dateTimeOfMeal.getFullYear + "/" + meal.dateTimeOfMeal.getMonth + "/" + meal.dateTimeOfMeal.getDay;
              return mPattm == mealPattm;
            });
          },
          error => {
            console.log(error);
          });
    } else {
      return this.meals.filter((m) => {
        var mPattm = m.dateTimeOfMeal.getFullYear + "/" + m.dateTimeOfMeal.getMonth + "/" + m.dateTimeOfMeal.getDay;
        var mealPattm = meal.dateTimeOfMeal.getFullYear + "/" + meal.dateTimeOfMeal.getMonth + "/" + meal.dateTimeOfMeal.getDay;
        return mPattm == mealPattm;
      });
    }
  }
}
