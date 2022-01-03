import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsaddComponent } from './mealsadd.component';

describe('MealsaddComponent', () => {
  let component: MealsaddComponent;
  let fixture: ComponentFixture<MealsaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealsaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
