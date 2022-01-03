import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersupdateComponent } from './usersupdate.component';

describe('UsersupdateComponent', () => {
  let component: UsersupdateComponent;
  let fixture: ComponentFixture<UsersupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
