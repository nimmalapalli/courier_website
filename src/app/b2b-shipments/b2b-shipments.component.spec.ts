import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bShipmentsComponent } from './b2b-shipments.component';

describe('B2bShipmentsComponent', () => {
  let component: B2bShipmentsComponent;
  let fixture: ComponentFixture<B2bShipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bShipmentsComponent],
    });
    fixture = TestBed.createComponent(B2bShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
