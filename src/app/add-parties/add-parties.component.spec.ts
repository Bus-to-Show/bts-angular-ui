import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartiesComponent } from './add-parties.component';

describe('AddPartiesComponent', () => {
  let component: AddPartiesComponent;
  let fixture: ComponentFixture<AddPartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
