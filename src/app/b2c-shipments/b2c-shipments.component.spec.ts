import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2cShipmentsComponent } from './b2c-shipments.component';

describe('B2cShipmentsComponent', () => {
  let component: B2cShipmentsComponent;
  let fixture: ComponentFixture<B2cShipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2cShipmentsComponent]
    });
    fixture = TestBed.createComponent(B2cShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
