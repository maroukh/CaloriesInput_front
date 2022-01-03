import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsupdateComponent } from './mealsupdate.component';

describe('MealsupdateComponent', () => {
  let component: MealsupdateComponent;
  let fixture: ComponentFixture<MealsupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealsupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
