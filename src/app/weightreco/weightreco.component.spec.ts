import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightrecoComponent } from './weightreco.component';

describe('WeightrecoComponent', () => {
  let component: WeightrecoComponent;
  let fixture: ComponentFixture<WeightrecoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeightrecoComponent]
    });
    fixture = TestBed.createComponent(WeightrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
