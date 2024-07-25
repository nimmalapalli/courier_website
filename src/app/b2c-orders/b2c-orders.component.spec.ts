import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2cOrdersComponent } from './b2c-orders.component';

describe('B2cOrdersComponent', () => {
  let component: B2cOrdersComponent;
  let fixture: ComponentFixture<B2cOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2cOrdersComponent]
    });
    fixture = TestBed.createComponent(B2cOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
