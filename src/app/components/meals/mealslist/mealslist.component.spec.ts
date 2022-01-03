import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealslistComponent } from './mealslist.component';

describe('MealslistComponent', () => {
  let component: MealslistComponent;
  let fixture: ComponentFixture<MealslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
